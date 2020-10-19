import argparse
from .course_ops import generate_json

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-s',
        '--semester',
        choices=['F', 'S'],
        help='the semester for which to run',
        required=True
    )
    parser.add_argument(
        '-c',
        '--category',
        choices=['ppc', 'sadm', 'ii', 'we'],
        required=True
    )
    args = parser.parse_args()
    generate_json(args.semester, args.category)
