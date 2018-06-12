			var volumeCheck;
			var playCheck;
			
			function randomNumber(max){
				var number = Math.floor((Math.random() * max) + 1);
				return number;
			};
			
			function getSong(){
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			        var MusicFile = JSON.parse(this.responseText);
                    var random = randomNumber(MusicFile.list.length); //Variable with random number in size of array

					document.getElementById("track").src = "music/" + MusicFile.list[random] + ".mp3";
					var name =  MusicFile.list[random].replace(".mp3", "");
					document.getElementById("songName").innerHTML = name;
					if(playCheck==1){ //Will automatically play newly selected song, if previous one ended.
						setTimeout(play, 1000);
						}
			    	}
				};
			xmlhttp.open("GET", "list.json", true);
			xmlhttp.send();
			}
			
			function play(){
				player.play();
				playCheck=1;
				document.getElementById("button-play").setAttribute("onclick","pause()");
				document.getElementById("button-play").src = "style/img/pause.png";
			};
			
			function pause(){
				player.pause();
				playCheck=0;
				document.getElementById("button-play").setAttribute("onclick","play()");
				document.getElementById("button-play").src = "style/img/play.png";
				
			};
			
			function stop(){
				player.pause();
				player.currentTime = 0;
				playCheck=0;
			};
			
			function volumeChanger(){
				player.volume=document.getElementById("volumeSlider").value;
				if(player.volume!=volumeCheck){
					unMute();
				}
			};
			
			function convertTime(input){
				var minutes= Math.floor(input / 60);
				var seconds= input - minutes * 60;
				var output = minutes + ":" + Math.round(seconds);
				return output;
				
			};
			
			function time(){
				var time=convertTime(player.currentTime);
				var duration=convertTime(player.duration);
				document.getElementById("time").innerHTML =  time + " / " + duration;
			};
			
			function mute(){
				player.volume = 0;
				document.getElementById("button-mute").src = "style/img/mute.png";
				document.getElementById("button-mute").setAttribute( "onclick", "unMute()" );
				volumeCheck=document.getElementById("volumeSlider").value;
			};
			
			function unMute(){
				player.volume = document.getElementById("volumeSlider").value;
				document.getElementById("button-mute").src = "style/img/Unmute.png";
				document.getElementById("button-mute").setAttribute( "onclick", "mute()" );
			};
			
			function checkForEnd(){
				if(player.currentTime == player.duration){
					getSong();
					setTimeout(play, 1000);
				}
			};
      
      getSong();
			
			setInterval(time, 1000);
			setInterval(checkForEnd, 1000);
