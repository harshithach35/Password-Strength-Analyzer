import sqlite3
import hashlib
import os


DATABASE_NAME = "password_history.db"


def hash_password(password, salt=None):
    """
    Create a secure password hash using PBKDF2-HMAC-SHA256.
    """

    if salt is None:
        salt = os.urandom(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        100000
    )

    return salt.hex(), password_hash.hex()


def create_database():
    """Create the password history table."""

    connection = sqlite3.connect(DATABASE_NAME)

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS password_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            salt TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    connection.close()


def save_password(password):
    """Store the salted password hash."""

    salt, password_hash = hash_password(password)

    connection = sqlite3.connect(DATABASE_NAME)

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO password_history
        (salt, password_hash)
        VALUES (?, ?)
        """,
        (salt, password_hash)
    )

    connection.commit()
    connection.close()


def password_was_used(password):
    """
    Check the password against all previously stored
    salted password hashes.
    """

    connection = sqlite3.connect(DATABASE_NAME)

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT salt, password_hash
        FROM password_history
        """
    )

    records = cursor.fetchall()

    connection.close()

    for salt_hex, stored_hash in records:

        salt = bytes.fromhex(salt_hex)

        _, calculated_hash = hash_password(
            password,
            salt
        )

        if calculated_hash == stored_hash:
            return True

    return False


# Create database
create_database()


if __name__ == "__main__":

    print("Password History System")
    print("-----------------------")

    password = input("Enter a password: ")

    if password_was_used(password):

        print("\n⚠️ This password was used before.")

    else:

        save_password(password)

        print("\n✅ Password saved successfully.")