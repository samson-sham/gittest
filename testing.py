import sys
# import hashlib
# ['SHA1', 'MDC2', 'SHA', 'SHA384', 
# 'ecdsa-with-SHA1', 'SHA256', 'SHA512', 
# 'md4', 'md5', 'sha1', 'dsaWithSHA', 'DSA-SHA', 
# 'sha', 'sha224', 'dsaEncryption', 'DSA', 
# 'ripemd160', 'mdc2', 'MD5', 'MD4', 'sha384', 
# 'SHA224', 'sha256', 'sha512', 'RIPEMD160']
# print (hashlib.algorithms_available)
# hasher = hashlib.sha512()
# with open('test.jpg', 'rb') as targetFile:
# 	buffering = targetFile.read()
# 	hasher.update(buffering)
# print (hasher.hexdigest())
print (sys.version)
import base64

# DICT = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/"
DICT = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
srclist = []
srclist.append("b4P8rRibczzlmlcRG1w8B3I3vDJh0pbZZDvO5qyfLKssWuy7laoOvfswy8Bc9YUMnn31TuYNDiGXvXBJ7O4xer68Uqc7bN2EA23B1o85SlkHUHE5kuAL42KsmxTV6h6l46W0pMKkwzlycAa0KGu2bnloADwapAIEuY6dx0XucjGY3dUFGGbyruFCmpYndA6MhVIHekU9")
srclist.append("B6hzdKnyTgiB93fKFQmpSsv37w7YuWc4L5LmhNaT2PxYRbNpJKG6QAoMKFGe7jscElvusWCwaOjj89cetU1ipRN9XqgPBnfTgOMN7v5xo4Bw5AkgDKe8AtSphmHQptyUxff9yd6aWvLSZtAfQq6QRNqR5V9ClGUyMrLUr0ynJIkmxfpAkV8URhzvvZOdgGXV9om0Eo8R")
srclist.append("cgVGzu22stxzyiV54PyxSqJrA4tPFAamNtMYinQFQGuSbHK82ac8RhXhXA6Wb90Q0S5CFVtnF05AoYMJo6qT2LdufegRvg5RJObastWUt9xtL1qZK90fElxcwQ2cvCiiWQs567NABJkJTB3TLoFBQ2QFFy4b4Ym4Na5EV0m7Pkg5qW22iYdXX9mcFWTEKKDlC8bJiu7f")
srclist.append("EDWJvhCZf3NRgYNNkRK5PUcxwmW7HY3Hx9nzif6a8g6qmOUXEzefcCah19D073oiFmzcgt2KkJFlMPrFSw4HBI2tKQOlejy7oKJxhkdE56F0joI1vTrWbIpn7YILfyNw2VsfpqpaXhUwPZ6NOjqU8VSEthdPUmIntfF6lljVn9DMZ0k97ltlP3V85PQg27Qf7bcgHOGe")
# data = base64.b64encode("testing")
# data = base64.b64decode("dGVzdGluZw==")
# data = "cgVGzu22stxzyiV54PyxSqJrA4tPFAamNtMYinQFQGuSbHK82ac8RhXhXA6Wb90Q0S5CFVtnF05AoYMJo6qT2LdufegRvg5RJObastWUt9xtL1qZK90fElxcwQ2cvCiiWQs567NABJkJTB3TLoFBQ2QFFy4b4Ym4Na5EV0m7Pkg5qW22iYdXX9mcFWTEKKDlC8bJiu7f"
# data = base64.decodestring("cgVGzu22stxzyiV54PyxSqJrA4tPFAamNtMYinQFQGuSbHK82ac8RhXhXA6Wb90Q0S5CFVtnF05AoYMJo6qT2LdufegRvg5RJObastWUt9xtL1qZK90fElxcwQ2cvCiiWQs567NABJkJTB3TLoFBQ2QFFy4b4Ym4Na5EV0m7Pkg5qW22iYdXX9mcFWTEKKDlC8bJiu7f==")
# data = base64.b64decode("cgVGzu22stxzyiV54PyxSqJrA4tPFAamNtMYinQFQGuSbHK82ac8RhXhXA6Wb90Q0S5CFVtnF05AoYMJo6qT2LdufegRvg5RJObastWUt9xtL1qZK90fElxcwQ2cvCiiWQs567NABJkJTB3TLoFBQ2QFFy4b4Ym4Na5EV0m7Pkg5qW22iYdXX9mcFWTEKKDlC8bJiu7f==")
# print (' '.join(format(ord(char), 'b') for char in data))
# binaryArray = format(ord(char), 'b') for char in data
# print binaryArray
# for char in data:
# 	print '{:08b}'.format(ord(char))
# print (map(bin, bytearray(data)))
# print (data)
# print "cgVGzu22stxzyiV54PyxSqJrA4tPFAamNtMYinQFQGuSbHK82ac8RhXhXA6Wb90Q0S5CFVtnF05AoYMJo6qT2LdufegRvg5RJObastWUt9xtL1qZK90fElxcwQ2cvCiiWQs567NABJkJTB3TLoFBQ2QFFy4b4Ym4Na5EV0m7Pkg5qW22iYdXX9mcFWTE".decode('base64','ignore')
# for char in src:
# 	print '{:06b}'.format(DICT.index(char))
def statistic(raw):
	fullBinary = ''.join('{:06b}'.format(DICT.index(char)) for char in raw)
	# print fullBinary
	# print len(fullBinary)
	print "0:{} 1:{}".format(fullBinary.count('0'), fullBinary.count('1'))
	return fullBinary

def dictDist(raw):
	for char in DICT:
		print raw.count(char)

# statistic(src)
# print srclist
map(statistic, srclist)
dictDist(''.join(srclist))