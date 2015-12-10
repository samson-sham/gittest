# import argparse
# import time
import sys
import hashlib

# time.sleep(0.5)
# print sys.argv[1]

# parser = argparse.ArgumentParser()
# parser.add_argument("ioStream", help="stdio")
# parser.add_argument("-hash", help="hash function to use", default="md5", choices=["md5", "sha1"])
# args = parser.parse_args()

# if args.ioStream:
	# hasher = hashlib.md5()
	# hasher.update(args.ioStream)
	# print (hasher.hexdigest())

# print (type(sys.stdin))
hasher = hashlib.md5()

filesize = 0

for line in sys.stdin:
	print "<read> {}".format(len(line))
	print line
	filesize += len(line)
	hasher.update(line)

print "<EOF> {}".format(filesize)
print (hasher.hexdigest())