var t=function(t){var e,i;function s(e,i){var s,n=i.x,o=void 0===n?0:n,h=i.y,r=void 0===h?0:h,a=i.width,d=i.height,l=i.top,c=void 0===l?0:l,p=i.bottom,u=void 0===p?5e3:p,v=i.wheel,m=void 0!==v&&v,g=i.drag,_=void 0===g?.95:g,w=i.minSpeed,Y=void 0===w?4:w,f=i.snap,y=void 0!==f&&f,b=i.snapConfig,M=void 0===b?{}:b;return(s=t.call(this,o,r,a,d)||this).scene=e,s.x=o,s.y=r,s.width=a||Number(s.scene.game.config.width),s.height=d||Number(s.scene.game.config.height),s.top=c,s.bottom=u-s.height,s.wheel=m,s.drag=_,s.minSpeed=Y,s.snap=y,s.snapGrid=M,s.moving=!1,s.snapGrid.topMargin=void 0===M.topMargin?0:M.topMargin,s.snapGrid.padding=M.padding||20,s.snapGrid.deadZone=void 0===M.deadZone?.4:M.deadZone,s.init(),s}i=t,(e=s).prototype=Object.create(i.prototype),e.prototype.constructor=e,e.__proto__=i;var n=s.prototype;return n.init=function(){this.scrollY=this.top||this.y,this._rectangle=new Phaser.Geom.Rectangle(this.x,this.y,this.width,this.height),this._speed=0,this._startY=this.scrollY,this._endY=this.scrollY,this._startTime=0,this._endTime=0,this.setDragEvent(),this.wheel&&this.setWheelEvent(),this.scene.time.addEvent({delay:500,callback:this.resetMoving,callbackScope:this,loop:!0}),this.scene.cameras.addExisting(this)},n.resetMoving=function(){this.moving=!1},n.setSpeed=function(t){var e=this;this._speed=t||(e._endY-e._startY)/((e._endTime-e._startTime)/1e3)},n.setDragEvent=function(){this.scene.input.on("pointermove",this.dragHandler,this),this.scene.input.on("pointerup",this.upHandler,this),this.scene.input.on("pointerdown",this.downHandler,this)},n.setWheelEvent=function(){window.addEventListener("wheel",this.wheelHandler.bind(this))},n.downHandler=function(){this._speed=0,this._startY=this.scrollY,this._startTime=performance.now()},n.dragHandler=function(t){t.isDown&&this.isOver(t)&&(this.scrollY-=t.position.y-t.prevPosition.y,this.moving=!0)},n.upHandler=function(){this._endY=this.scrollY,this._endTime=performance.now(),this.moving&&this.setSpeed()},n.wheelHandler=function(t){this.isOver(this.scene.input.activePointer)&&(this.scrollY+=t.deltaY)},n.isOver=function(t){return this._rectangle.contains(t.x,t.y)},n.clampScroll=function(){this.scrollY=Phaser.Math.Clamp(this.scrollY,this.top,this.bottom),this._endY=this.scrollY},n.update=function(t,e){if(this.scrollY+=this._speed*(e/1e3),this._speed*=this.drag,Math.abs(this._speed)<this.minSpeed&&(this._speed=0,this.snap&&!this.scene.input.activePointer.isDown)){var i=this.top+this.snapGrid.topMargin,s=this.snapGrid.padding,n=(this.scrollY-i)/s;Math.abs(.5-n%1)>=this.snapGrid.deadZone/2&&(this.scrollY=i+Math.round(n)*s)}this.clampScroll()},n.destroy=function(){this.emit(Phaser.Cameras.Scene2D.Events.DESTROY,this),window.removeEventListener("wheel",this.wheelHandler),this.removeAllListeners(),this.matrix.destroy(),this.culledObjects=[],this._customViewport&&this.sceneManager.customViewports--,this._bounds=null,this.scene=null,this.scaleManager=null,this.sceneManager=null},s}(Phaser.Cameras.Scene2D.Camera);module.exports=t;
