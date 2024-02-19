import os
import shutil

def delete_pycache_and_migrations(root_dir):
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Delete __pycache__ directories
        for dirname in dirnames:
            if dirname == "__pycache__":
                pycache_path = os.path.join(dirpath, dirname)
                print(f"Deleting {pycache_path}")
                shutil.rmtree(pycache_path)

        # Delete migrations directories
        if "migrations" in dirnames:
            migrations_path = os.path.join(dirpath, "migrations")
            print(f"Deleting {migrations_path}")
            shutil.rmtree(migrations_path)

if __name__ == "__main__":
    # Set the root directory for the search
    root_directory = "."

    delete_pycache_and_migrations(root_directory)

    print("Cleanup complete!")
