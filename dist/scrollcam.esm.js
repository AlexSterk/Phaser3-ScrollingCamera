var t=function(t){var s,i;function n(s,i){var n;(n=t.call(this,0,0,0,0)||this).drag=.95,n.snapIndex=0,n.x=0,n.y=0,n._end=0,n._endTime=0,n.isOnSnap=!0,n._moving=!1,n._snapBounces=0,n._speed=0,n._start=0,n._startTime=0;var e=(i=i||{}).x,h=i.y,o=i.width,a=i.height,r=i.contentBounds,d=i.wheel,l=i.drag,c=i.snap,p=i.horizontal;return n.scene=s,n.x=void 0!==e?e:0,n.y=void 0!==h?h:0,n.width=o||Number(n.scene.game.config.width),n.height=a||Number(n.scene.game.config.height),n.drag=void 0!==l?l:n.drag,n.horizontal=p,n.initContentBounds(r),n.initWheel(d),n.initSnap(c),n.initScroll(),n.initInputZone(),n.setEvents(),n._debug=!1,n._debug&&(n._txtDebug=n.scene.add.text(n.x,n.y,"debug")),n.scene.cameras.addExisting(function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(n)),n.setOrigin(0),n}i=t,(s=n).prototype=Object.create(i.prototype),s.prototype.constructor=s,s.__proto__=i;var e=n.prototype;return e.setSpeed=function(t){var s=this;this._speed=t||(s._end-s._start)/((s._endTime-s._startTime)/1e3)},e.update=function(t,s){var i=this._scrollProp;if(this[i]+=this._speed*(s/1e3),this._speed*=this.drag,this.isOnSnap||this.checkBounds(),Math.abs(this._speed)<1&&!this.snap.enable)this._speed=0,this._moving=!1;else if(this.snap.enable&&!this.isOnSnap&&(!this.scene.input.activePointer.isDown||!this.pointerIsOver())){var n=this._speed,e=this.getNearest(this[i]),h=this[i]-e,o=Math.sign(h);this._speed+=16*-o*(1/(h*h+1))-8*o,(n>0&&this._speed<0||n<0&&this._speed>0)&&this._snapBounces++,this._snapBounces>this.snap.bounces&&this.makeSnap(e)}this.clampScroll()},e.destroy=function(){this.emit(Phaser.Cameras.Scene2D.Events.DESTROY,this),this._zone.removeAllListeners(),this._zone.destroy(),this.removeAllListeners(),this.matrix.destroy(),this.culledObjects=[],this._customViewport&&this.sceneManager.customViewports--,this._bounds=null,this.scene=null,this.scaleManager=null,this.sceneManager=null},e.initContentBounds=function(t){var s=t||{x:this.x,y:this.y};s.x="x"in s?s.x:this.x,s.y="y"in s?s.y:this.y,s.length="length"in s?s.length:5e3,this.horizontal?(this._startBound=s.x,this._endBound=s.x+s.length-this.width):(this._startBound=s.y,this._endBound=s.y+s.length-this.height),this.contentBounds=s},e.initInputZone=function(){this._zone=this.scene.add.zone(this.x,this.y,this.width,this.height).setOrigin(0).setInteractive()},e.initScroll=function(){this.scrollX=this.horizontal?this._startBound:this.contentBounds.x,this.scrollY=this.horizontal?this.contentBounds.y:this._startBound,this._scrollProp=this.horizontal?"scrollX":"scrollY"},e.initWheel=function(t){var s=t||{enable:!1};s.delta="delta"in s?s.delta:55,this.wheel=s},e.initSnap=function(t){var s=t||{enable:!1};s.bounces=s.bounces||3,s.padding=s.padding||20,this.snap=s},e.setEvents=function(){this._zone.on("pointermove",this.dragHandler,this),this._zone.on("pointerup",this.upHandler,this),this._zone.on("pointerout",this.upHandler,this),this._zone.on("pointerdown",this.downHandler,this),this.wheel.enable&&this._zone.on("wheel",this.wheelHandler,this)},e.downHandler=function(){var t=this._scrollProp;this._speed=0,this._snapBounces=0,this._start=this[t],this._startTime=performance.now()},e.dragHandler=function(t){t.isDown&&(this.horizontal?this.scrollX-=t.position.x-t.prevPosition.x:this.scrollY-=t.position.y-t.prevPosition.y,this._moving=!0)},e.upHandler=function(){this._end=this.horizontal?this.scrollX:this.scrollY,this._endTime=performance.now(),this.isOnSnap=!1,this._moving&&(this._moving=!1,this.setSpeed())},e.wheelHandler=function(t){var s=this._scrollProp,i=Math.sign(t.deltaY);this[s]+=i*this.wheel.delta,this._snapBounces=0,this.isOnSnap=!1},e.getNearest=function(t){var s=this.snap.padding;return this._startBound+Math.round((t-this._startBound)/s)*s},e.getSnapIndex=function(t,s,i){return Math.round((t-s)/i)},e.debug=function(t){var s="";t.forEach(function(t){s+=t.toString()+"\n"}),this._txtDebug.setText(s)},e.pointerIsOver=function(){var t=!0,s=this.scene.input.activePointer;return(s.x<this.x||s.x>this.x+this.width||s.y<this.y||s.y>this.y+this.height)&&(t=!1),t},e.checkBounds=function(){var t=this._scrollProp;this[t]<=this._startBound?(this[t]=this._startBound,this.makeSnap(this.getNearest(this[t]))):this[t]>=this._endBound&&(this[t]=this._endBound,this.makeSnap(this.getNearest(this[t])))},e.clampScroll=function(){var t=this._scrollProp;this[t]=Phaser.Math.Clamp(this[t],this._startBound,this._endBound),this._end=this[t]},e.makeSnap=function(t){var s=this._scrollProp;this[s]=t,this.snapIndex=this.getSnapIndex(this[s],this._startBound,this.snap.padding),this._snapBounces=0,this.isOnSnap=!0,this._speed=0,this.snap.enable&&this.emit("snap",this.snapIndex)},n}(Phaser.Cameras.Scene2D.Camera);export default t;
