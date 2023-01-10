//FIRE IS A BLOCK NOT AN ENTITY!!

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

// let hub
// register('step', () => {
// 	hub = false
// 	try {
// 		TabList.getNames().forEach(name => {
// 			if (ChatLib.removeFormatting(name).includes("Area: Hub")) {
// 				hub = true
// 			}
// 		})
// 	} catch (e) { }
// }).setFps(1)


let gbossinrange
register('step', () => {
	//if (!hub) return
	gbossinrange = false
	World.getAllEntitiesOfType(EntityArmorStand).forEach(entity => {
		if (entity.getName().includes("Ashfang")) {
			entity = ChatLib.removeFormatting(entity.getName())
			hp = entity.match(/Ashfang.*\/.*❤/)[0].replace('Ashfang ', '').replace("❤", '').split('/')
			gbossinrange = true
			currenthp = hp[0]
			maxhp = hp[1]

			if (currenthp.includes("k")) {
				currenthpint = currenthp.replace("k", "")
				currenthpint = currenthpint * 1000
			} else if (currenthp.includes("M")) {
				currenthpint = currenthp.replace("M", "")
				currenthpint = currenthpint * 1000000
			} else if (currenthp == 0) {
				currenthpint = 0
			}
			currenthpint = Math.round(currenthpint)
			if (maxhp.includes("k")) {
				maxhpint = maxhp.replace("k", "")
				maxhpint = maxhpint * 1000
			} else if (maxhp.includes("M")) {
				maxhpint = maxhp.replace("M", "")
				maxhpint = maxhpint * 1000000
			}
		}
	});
}).setFps(10)


register('renderOverlay', () => {
	//if (!hub) return
	if (!gbossinrange) return
	if (currenthpint == undefined || maxhpint == undefined) return

	let widthpre = Renderer.screen.getWidth();
	let width = widthpre / 4;
	let y = 35

	Renderer.drawLine(Renderer.BLACK, width * 1.5, y, width * 2.5, y, 10);
	Renderer.drawLine(Renderer.GRAY, width * 1.5 + 1, y, width * 2.5 - 1, y, 10 - 2);

	Renderer.drawStringWithShadow("&2&lAshfang", widthpre / 2 - Renderer.getStringWidth("Ashfang") / 2 - 5, y - 14);


	rightx = width * 1.5 + (width - 1) * currenthpint / maxhpint
	if (rightx > width * 1.5) Renderer.drawLine(Renderer.GREEN, width * 1.5 + 1, y, rightx, y, 10 - 2)

	if (y == 35) { y = 38 }
	let displaylifestring = `&0${currenthp}/${maxhp}`
	Renderer.finishDraw();
	Renderer.scale(0.85)
	Renderer.drawString(`${displaylifestring}`, (widthpre / 2 - Renderer.getStringWidth(displaylifestring) / 2) / 0.85, y)
});