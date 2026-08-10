from flask import Flask, render_template, request, jsonify
import sqlite3
import hashlib

app = Flask(__name__)

DATABASE_NAME = "password_history.db"


def hash_password(password):
    """Create a SHA-256 hash of the password."""
    return hashlib.sha256(
        password.encode("utf-8")
    ).hexdigest()


def password_was_used(password):
    """Check whether the password exists in password history."""

    password_hash = hash_password(password)

    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT id
        FROM password_history
        WHERE password_hash = ?
        """,
        (password_hash,)
    )

    result = cursor.fetchone()

    connection.close()

    return result is not None


def save_password(password):
    """Save only the password hash to the database."""

    password_hash = hash_password(password)

    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO password_history (password_hash)
        VALUES (?)
        """,
        (password_hash,)
    )

    connection.commit()
    connection.close()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/check-password", methods=["POST"])
def check_password():

    data = request.get_json()

    password = data.get("password", "")

    if not password:
        return jsonify({
            "success": False,
            "message": "Please enter a password."
        })

    if password_was_used(password):

        return jsonify({
            "success": True,
            "used_before": True,
            "message": "This password was used before."
        })

    save_password(password)

    return jsonify({
        "success": True,
        "used_before": False,
        "message": "This password has not been used before."
    })


if __name__ == "__main__":
    app.run(debug=True)