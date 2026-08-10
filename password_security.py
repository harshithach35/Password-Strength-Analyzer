import hashlib


def hash_password(password):
    """
    Convert a password into a SHA-256 hash.
    The original password is not stored.
    """

    password_bytes = password.encode("utf-8")

    password_hash = hashlib.sha256(
        password_bytes
    ).hexdigest()

    return password_hash


# Test the hashing function

password = input("Enter a password: ")

hashed_password = hash_password(password)

print("\nOriginal Password:")
print(password)

print("\nSHA-256 Hash:")
print(hashed_password)