<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">家长登录</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
	// 设置cookie
	function setCookie(c_name,value,expireseconds){
	    var exdate=new Date();
	    exdate.setTime(exdate.getTime()+expireseconds * 1000);
	    document.cookie=c_name+ "=" +escape(value)+
	    ((expireseconds==null) ? "" : ";expires="+exdate.toGMTString())
	}
	setCookie('name','zzyn',3600);
	//获取cookie
	function getCookie(c_name){
	    if (document.cookie.length>0){
	        var c_start=document.cookie.indexOf(c_name + "=");
	        if (c_start!=-1){
	            c_start=c_start + c_name.length+1;
	            var c_end=document.cookie.indexOf(";",c_start);
	            if (c_end==-1){ 
	                c_end=document.cookie.length;
	            }
	
	            return unescape(document.cookie.substring(c_start,c_end));
	        }
	     }
	    return "";
	}
	var uname= getCookie('name');
	console.log(uname);
	
</script>

<style>

</style>
