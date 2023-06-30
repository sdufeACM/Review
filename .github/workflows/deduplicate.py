import os
from collections import defaultdict
import shutil


def deduplicate_files(directory):
    file_counts = defaultdict(int)

    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            file_counts[file_path] += 1

            for file_path, count in file_counts.items():
                if count > 1:
                    base_name = os.path.basename(file_path)
                    base_dir = os.path.dirname(file_path)
                    new_file_path = os.path.join(
                        base_dir, f"Deduplicated_{base_name}")
                    shutil.move(file_path, new_file_path)

                    # 指定要对文件夹进行去重操作的路径
                    directory_path = "."
                    deduplicate_files(directory_path)
