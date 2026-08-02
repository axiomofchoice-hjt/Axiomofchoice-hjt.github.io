from pathlib import Path
import argparse


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--filter", type=str, default=None)
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()

    docs_path = Path(__file__).parent.parent / "docs"

    collect = []
    for file in docs_path.rglob("*.md"):
        if file.parent.name == "10.算法竞赛记录":
            continue
        if file.name in ["index.md", "archivesPage.md", "categoriesPage.md"]:
            continue
        if not args.filter or args.filter in str(file):
            collect.append(
                file.relative_to(docs_path).as_posix() + "\n" + file.read_text()
            )

    print("\n".join(collect))
