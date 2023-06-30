import os
from collections import defaultdict
import hashlib

def calculate_md5(file_path):
    with open(file_path, 'rb') as f:
        data = f.read()
        md5_hash = hashlib.md5(data).hexdigest()
    return md5_hash

def check_for_duplicates(directory):
    file_hashes = defaultdict(list)
    duplicate_files = []

    for root, dirs, files in os.walk(directory):
        if ".git" in dirs:
            dirs.remove(".git")
        
        for file in files:
            file_path = os.path.join(root, file)
            md5_hash = calculate_md5(file_path)
            file_hashes[md5_hash].append(file_path)

    for hash_value, file_paths in file_hashes.items():
        if len(file_paths) > 1:
            duplicate_files.extend(file_paths)

    if duplicate_files:
        print("Error: Duplicate files found!")
        for file_path in duplicate_files:
            print(f"\t- {file_path}")
        exit(1)
    else:
        print("No duplicate files found.")
        exit(0)

directory_path = "."
check_for_duplicates(directory_path)
