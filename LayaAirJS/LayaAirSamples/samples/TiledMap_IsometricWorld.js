var Sprite = Laya.Sprite;
var MapLayer = Laya.MapLayer;
var TiledMap = Laya.TiledMap;
var Rectangle = Laya.Rectangle;
var Point = Laya.Point;
var Handler = Laya.Handler;

var tiledMap;
var layer;
var sprite;

Laya.init(1600, 800);

createMap();

Laya.stage.on("click", this, onStageClick);

function createMap()
{
	tiledMap = new TiledMap();
	tiledMap.createMap("res/tiledMap/isometric_grass_and_water.json", new Rectangle(0, 0, Laya.stage.width, Laya.stage.height), Handler.create(this, mapLoaded), null, new Point(1600, 800));
}

function onStageClick()
{
	var p = new Point(0, 0);
	layer.getTilePositionByScreenPos(Laya.stage.mouseX, Laya.stage.mouseY, p);
	layer.getScreenPositionByTilePos(Math.floor(p.x), Math.floor(p.y), p);
	sprite.pos(p.x, p.y);
}

function mapLoaded()
{
	layer = tiledMap.getLayerByIndex(0);

	var radiusX = 32;
	var radiusY = Math.tan(180 / Math.PI * 30) * radiusX;
	var color = "cyan";

	sprite = new Sprite();
	sprite.graphics.drawLine(0, 0, -radiusX, radiusY, color);
	sprite.graphics.drawLine(0, 0, radiusX, radiusY, color);
	sprite.graphics.drawLine(-radiusX, radiusY, 0, radiusY * 2, color);
	sprite.graphics.drawLine(radiusX, radiusY, 0, radiusY * 2, color);
	Laya.stage.addChild(sprite);
}