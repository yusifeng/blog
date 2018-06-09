<template>
  	<div class="bg" ref="bg" @touchmove.prevent="null">
		<div class="home">
			<h1 class="box">David Zhang</h1>
			<h3>You can only connect dots looking backwards</h3>
			<ul>
				<li>Be  simple</li>
				<li>Keep a mild temper</li>
				<li>Learn to sum up</li>
				<li>And make difference 🤔</li>
			</ul>
			<div class="btn">
				<NavLink class="action-button bttn-unite bttn-md bttn-primary" :item="actionLink"/>
				<NavLink class="action-button bttn-unite bttn-md bttn-primary" :item="actionLink2"/>
			</div>
		</div>
		{{data.actionLink1}}
		<canvas ref="c"/>
  	</div>
</template>

<script>
import NavLink from "./NavLink.vue";

export default {
  components: { NavLink },
  computed: {
    data () {
      return this.$page.frontmatter
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
	},
	actionLink2 () {
      return {
        link: this.data.actionLink2,
        text: this.data.actionText2
      }
    }
  },
  mounted() {
    document.addEventListener('touchmove', function (e) {
        e.preventDefault()
    })
    var c = this.$refs.c,
        x = c.getContext('2d'),
		pr = window.devicePixelRatio || 1,
        w = window.innerWidth,
        h = window.innerHeight,
        f = 90,
        q,
        m = Math,
        r = 0,
        u = m.PI*2,
        v = m.cos,
        z = m.random
    c.width = w*pr
    c.height = h*pr
    x.scale(pr, pr)
	x.globalAlpha = 0.6
	console.log(pr)
    function i(){
        x.clearRect(0,0,w,h)
        q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
        while(q[1].x<w+f) d(q[0], q[1])
    }
    function d(i,j){   
        x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        var k = j.x + (z()*2-0.25)*f,
            n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r-=u/-50
        x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = {x:k,y:n}
    }
    function y(p){
        var t = p + (z()*2-1.1)*f
        return (t>h||t<0) ? y(p) : t
    }
    document.onclick = i
    document.ontouchstart = i
    i()
  }
  
};
</script>


<style lang="stylus">
@import './styles/config.styl';

.bg {
	position: relative;
	width 100vw
	height 100vh
	// background-color #fff
	.home {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		height 400px
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;



		h1 {
			text-align: center;
			font-size: 30px;
			font-weight: 700
			letter-spacing 9px;
			text-transform: uppercase;
			font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
		}

		h3 {
			text-align: center;
			font-size: 21px;
			color: #999;
			margin: 20px auto;
		}

		ul {
			margin-bottom: 50px;
			text-align center
			list-style none
		}

		.btn {
			margin-top 40px
			display: flex;
			width: 300px;
			margin: 0 auto;
			justify-content: space-around;

			.action-button {
				display inline-block
				padding 5px 30px
				background-color transparent
			}
		}
	}
	canvas {
		width 100%
		height 100%
	}
}
</style>
