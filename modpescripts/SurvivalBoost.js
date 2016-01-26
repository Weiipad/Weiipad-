/*
 这个mod由 百度贴吧@weiipad制作，未经允许请勿转载
 */

var version = "Survival Boost Mod v0.1"
var password = "WeiipadPassword"
var debugMode = false;

//铁器的回收
//Item.addFurnaceRecipe(前, 后)用于熔炉的方法
Item.addFurnaceRecipe(256, 265) //铁铲
Item.addFurnaceRecipe(257, 265) //铁镐
Item.addFurnaceRecipe(258, 265) //铁斧
Item.addFurnaceRecipe(267, 265) //铁剑
Item.addFurnaceRecipe(306, 265) //头盔
Item.addFurnaceRecipe(307, 265) //胸甲
Item.addFurnaceRecipe(308, 265) //腿甲
Item.addFurnaceRecipe(309, 265) //铁靴
Item.addFurnaceRecipe(325, 265) //桶
Item.addFurnaceRecipe(328, 265) //矿车
Item.addFurnaceRecipe(330, 265) //铁门

//黄金器的回收
Item.addFurnaceRecipe(283, 266) 
Item.addFurnaceRecipe(284, 266)
Item.addFurnaceRecipe(285, 266)
Item.addFurnaceRecipe(286, 266)
Item.addFurnaceRecipe(284, 266)
Item.addFurnaceRecipe(285, 266)

Item.addShapedRecipe(406, 3, 0, ["g  ", "g  ", "g  "], ["g", 20, 0])

//新建了一个个方块
Block.defineBlock(241, "超级煤炭块", ["coal_block", 0], 0, false, 0)
Block.setColor(241, [0x000000])
Block.setDestroyTime(241, 3)

//超级煤炭块+煤合成钻石
Item.addShapedRecipe(241, 1, 0, ["ccc", "ccc", "ccc"], ["c", 173, 0])
Item.addShapedRecipe(264, 1, 0, ["ccc", "csc", "ccc"], ["c", 263, 0, "s", 241, 0])
Item.addShapedRecipe(5, 1, 0, ["ss", "ss"], ["s", 280, 0]) 

function destroyAndDrop(x, y, z, count, id, damage) {
	setTile(x, y, z, 0);
	Level.dropItem(x, y, z, count, id, damage);
}

function destroyBlock(x, y, z, side) {
	var tileId = getTile(x, y, z); //还是懒
	var tileData = Level.getData(x, y, z);
	var carriedItem = Player.getCarriedItem();
	
	var test = carriedItem != 280;

	if (tileId == 17 && (carriedItem != 280 || carriedItem != 271 || carriedItem != 275 || carriedItem != 279 || carriedItem != 286))
	{
		preventDefault();
	}

	clientMessage(carriedItem);
	clientMessage(tileId);
	clientMessage(test);
	if (tileId == 1 && (tileData == 1 || tileData == 3 || tileData == 5) && Math.random() <= 0.05)
	{ //闪长岩，花岗岩和安山岩有5%的几率掉落石英
		destroyAndDrop(x, y, z, 1, 406, 0);
	}
	else if (tileId == 12 && Math.random() <= 0.001)
	{
		destroyAndDrop(x, y, z, 1, 380, 0);
	}
	else if (tileId == 18 && Math.random() <= 1)
	{
		Level.dropItem(x, y, z, 1, 257, 0);
	}
}

function uesItem(x, y, z, i, b, id, bd) {
	Level.dropItem(x, y, z, 1, 280, 1);
}

//一些命令
function procCmd(cmd) 
{
	var data = cmd.split(" ");
	switch (data[0])
	{
		case "cabout":
			switch (data[1])
			{
				case "thisMod":
					clientMessage(version);
					break;

				case "developer":
					clientMessage("BaiduTiebar @weiipad");
					break;
			}
			break;

		case "cdebugMode":
			if (data[1] == "on" && data[2] == password)
				debugMode = true;
			else if (data[1] == "off")
				debugMode = false;

		case "cget":
			if (debugMode)
			{
				if (data[1] != null && data[2] != null)
				{
					Player.addItemInventory(data[1], data[2], data[3]);
				}
				else
				{
					clientMessage("Could not found the ID or count");
				}
			}
			break;

		case "ctime":
			if (debugMode)
				Level.setTime(data[1]);

			break;

		case "chelp":
			if (debugMode)
				clientMessage(ChatColor.GREEN + "Usage" + ChatColor.WHITE + ": \n   --cget [id] [count] [damage] \n   --cabout [thisMod/developer] \n    --ctime [time]");
	}
}
