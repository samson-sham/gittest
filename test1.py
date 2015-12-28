def intitialize(*map):
	map = map[0] if map else list((0,)*9)
	for i in range(0,9):
		map[i] = "%d"%(i+1);
	return map;

def checkMap(map):
	for i in map:
		if i.isdigit():
			return False
	return True

def checkWin(map):
	def checkBlock(block):
		x = 0
		# print "checking: {}".format(block)
		for j in range(0,3):
			if x == 0:
				x = block[j]
				continue
			elif block[j] != x:
				return False
		return True;
	for i in range(0,3):
		if checkBlock(map[i*3:i*3+3]):
			return True
	for i in range(0,3):
		if checkBlock(map[i::3]):
			return True
	if checkBlock(map[0::4]):
		return True
	if checkBlock(map[2:7:2]):
		return True
	return False

def printMap(map):
	for i in range(0,3):
		print map[i*3:i*3+3]

# switcher = {
# 	"q": lambda break,
# 	"n": lambda map = intitialize(map)
# }
turn = 1
map = intitialize()
printMap(map)
while True:
	move = raw_input(">>")
	if move == "q":
		break
	elif move == "n":
		map = intitialize(map)
	elif move.isdigit():
		move = int(move)
		if move in range(1,10):
			if not map[move-1].isdigit():
				continue
			map[move-1] = "O" if turn == 1 else "X"
			printMap(map)
			if checkMap(map):
				break
			if checkWin(map):
				print ("O" if turn == 1 else "X") + " wins!"
				break
			turn *= -1
