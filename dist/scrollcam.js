var t=function(t){var i,s;function n(i,s){var n;(n=t.call(this,0,0,0,0)||this).drag=.95,n.snapIndex=0,n.x=0,n.y=0,n._end=0,n._endTime=0,n.isOnSnap=!0,n._moving=!1,n._snapBounces=0,n._speed=0,n._start=0,n._startTime=0,n._upTriggered=!1,n._inertia_frames=0;var e=(s=s||{}).x,h=s.y,o=s.width,r=s.height,a=s.contentBounds,d=s.wheel,l=s.drag,p=s.snap,u=s.horizontal;return n.scene=i,n.x=void 0!==e?e:0,n.y=void 0!==h?h:0,n.width=o||Number(n.scene.game.config.width),n.height=r||Number(n.scene.game.config.height),n.drag=void 0!==l?l:n.drag,n.horizontal=u,n.initContentBounds(a),n.initWheel(d),n.initSnap(p),n.initScroll(),n.initInputZone(),n.setEvents(),n._debug=!1,n._debug&&(n._txtDebug=n.scene.add.text(n.x,n.y,"debug")),n.scene.cameras.addExisting(function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(n)),n.setOrigin(0),n}s=t,(i=n).prototype=Object.create(s.prototype),i.prototype.constructor=i,i.__proto__=s;var e=n.prototype;return e.moveToSnap=function(t){this.snap.enable&&this.makeSnap(this._startBound+t*this.snap.padding)},e.setSpeed=function(t){var i=this;this._speed=t||(i._end-i._start)/((i._endTime-i._startTime)/1e3)},e.update=function(t,i){var s=this._scrollProp;if(this[s]+=this._speed*(i/1e3),this._speed*=this.drag,this._inertia_frames>0&&this._inertia_frames--,this.isOnSnap||this.checkBounds(),Math.abs(this._speed)<1&&!this.snap.enable&&this._moving&&!this._inertia_frames)this._speed=0,this._moving=!1;else if(this.snap.enable&&!this.isOnSnap&&(!this.scene.input.activePointer.isDown||!this.pointerIsOver())){var n=this._speed,e=this.getNearest(this[s]),h=this[s]-e,o=Math.sign(h);this._speed+=16*-o*(1/(h*h+1))-8*o,(n>0&&this._speed<0||n<0&&this._speed>0)&&this._snapBounces++,this._snapBounces>this.snap.bounces&&this.makeSnap(e)}this.clampScroll()},e.destroy=function(){this.emit(Phaser.Cameras.Scene2D.Events.DESTROY,this),this._zone.removeAllListeners(),this._zone.destroy(),this.removeAllListeners(),this.matrix.destroy(),this.culledObjects=[],this._customViewport&&this.sceneManager.customViewports--,this._bounds=null,this.scene=null,this.scaleManager=null,this.sceneManager=null},e.initContentBounds=function(t){var i=t||{x:this.x,y:this.y};i.x="x"in i?i.x:this.x,i.y="y"in i?i.y:this.y,i.length="length"in i?i.length:5e3,this.horizontal?(this._startBound=i.x,this._endBound=i.x+i.length-this.width):(this._startBound=i.y,this._endBound=i.y+i.length-this.height),this.contentBounds=i},e.initInputZone=function(){this._zone=this.scene.add.zone(this.x,this.y,this.width,this.height).setOrigin(0).setInteractive()},e.initScroll=function(){this.scrollX=this.horizontal?this._startBound:this.contentBounds.x,this.scrollY=this.horizontal?this.contentBounds.y:this._startBound,this._scrollProp=this.horizontal?"scrollX":"scrollY"},e.initWheel=function(t){var i=t||{enable:!1};i.delta="delta"in i?i.delta:55,this.wheel=i},e.initSnap=function(t){var i=t||{enable:!1};i.bounces=i.bounces||3,i.padding=i.padding||20,this.snap=i},e.setEvents=function(){this._zone.on("pointermove",this.dragHandler,this),this._zone.on("pointerup",this.upHandler,this),this._zone.on("pointerout",this.upHandler,this),this._zone.on("pointerdown",this.downHandler,this),this.wheel.enable&&this._zone.on("wheel",this.wheelHandler,this)},e.downHandler=function(){var t=this._scrollProp;this._upTriggered=!1,this._speed=0,this._snapBounces=0,this._start=this[t],this._startTime=performance.now()},e.dragHandler=function(t){t.isDown&&(this.horizontal?this.scrollX-=t.position.x-t.prevPosition.x:this.scrollY-=t.position.y-t.prevPosition.y,this._inertia_frames=2,this._moving=!0)},e.upHandler=function(){this._upTriggered||(this._upTriggered=!0,this._end=this.horizontal?this.scrollX:this.scrollY,this._endTime=performance.now(),this.isOnSnap=!1,this._moving&&(this._moving=!1,this.setSpeed()))},e.wheelHandler=function(t){var i=this._scrollProp,s=Math.sign(t.deltaY);this[i]+=s*this.wheel.delta,this._snapBounces=0,this.isOnSnap=!1},e.getNearest=function(t){var i=this.snap.padding;return this._startBound+Math.round((t-this._startBound)/i)*i},e.getSnapIndex=function(t,i,s){return Math.round((t-i)/s)},e.debug=function(t){var i="";t.forEach(function(t){i+=t.toString()+"\n"}),this._txtDebug.setText(i)},e.pointerIsOver=function(){var t=!0,i=this.scene.input.activePointer;return(i.x<this.x||i.x>this.x+this.width||i.y<this.y||i.y>this.y+this.height)&&(t=!1),t},e.checkBounds=function(){var t=this._scrollProp;this[t]<=this._startBound?(this[t]=this._startBound,this.makeSnap(this.getNearest(this[t]))):this[t]>=this._endBound&&(this[t]=this._endBound,this.makeSnap(this.getNearest(this[t])))},e.clampScroll=function(){var t=this._scrollProp;this[t]=Phaser.Math.Clamp(this[t],this._startBound,this._endBound),this._end=this[t]},e.makeSnap=function(t){var i=this._scrollProp;this[i]=t,this.snapIndex=this.getSnapIndex(this[i],this._startBound,this.snap.padding),this._snapBounces=0,this.isOnSnap=!0,this._speed=0,this.snap.enable&&this.emit("snap",this.snapIndex)},n}(Phaser.Cameras.Scene2D.Camera);module.exports=t;
