//icespray timer
let last_ice = 0;
register("playerInteract", (action, position, event) => {
    if(!Player.getHeldItem()?.getName()?.removeFormatting()?.includes("Ice Spray Wand")) return;
    last_ice = Date.now();
})

register("renderOverlay", () => {
    if(Date.now() - last_ice < 5000) {
        Renderer.drawStringWithShadow(parseInt((5000-(Date.now()-last_ice))/100), Renderer.screen.getWidth()/2-2, Renderer.screen.getHeight()/2-10)
    }
})

//1673336912600\


// 200ms - 400ms