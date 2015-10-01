// Standard window preset

function standardWin(thisObj){
	function theGUI(thisObj){
		// Check if the script is run from the Window menu or from the file menu as an external script.
		// The window will only be resizable if run from the window menu.
		if(thisObj instanceof Panel){
			var mWin = thisObj;
		}else{
			var mWin = (thisObj instanceof Panel)? thisObj : new Window("palette","Standard Window", undefined, {resizable:true});
		}
        //    R E S O U R C E    S T R I N G
		// Add stuff to the res string, to create well aligned layouts.
		var res =
		"group{orientation:'column',alignChildren:['fill','top']\
			header: Group{orientation:'column',alignChildren:['center','top']\
				xPos: StaticText{text:'',characters:10}\
				yPos: StaticText{text:'',characters:10}\
			}\
			clips: Panel{orientation:'row',size:['whatever','400'],alignChildren:['center','center'],\
				text:'Clips',\
			}\
		}"
		
		mWin.grp = mWin.add(res); // Uncomment this line to use the contents of the res string.

		//    F U N C T I O N A L I T Y
		function funky(builder){ // Input main group that contains elements to add functionality to
			//define root location:
			var rootF = new File(File.openDialog("Select all frames you wanna import...",true));


			//open image sequence and add it to the UI;
			function addFile(filePath,parent,num){
				var num = 50;
				var file = new File(filePath);
					file.open('r');
				var newStack = parent.add('group',undefined);
					newStack.size = [400,400];
					newStack.alignChildren = 'stack';
				

				/* C O N T I N U E    H E R E
				1) Figure out how to add multiple images in a stack (add one by one in a for loop), add the UIImage objects to an array.
				2) how to loop through them according to mouse position(use show/hide in array);
				*/
				// var newClip = newStack.add('image',undefined,file[i]);
				// 	alert(newClip);
				// 	clipSize = newClip.image.size;
				// 	newClip.size = [clipSize[0]*.75,clipSize[1]*.75];

				
			}
			addFile(rootF,builder.clips)

			builder.size = [500,500] // Window Size

			var mousePos = [0,0]
			function writePos(builder,mouseX,mouseY){
				with(builder){
					xPos.text = 'x: '+mouseX;
					yPos.text = 'y: '+mouseY;
				};
			}
			writePos(builder.header,mousePos[0],mousePos[1]);

			//   M O U S E   P O S I T I O N
			function updateMouse(e){
				var objX = e.clientX.toString();
				var objY = e.clientY.toString();
				clearOutput();
				writeLn('xPos: '+objX+' yPos: '+objY); // Debug info
				mousePos[0] = objX;
				mousePos[1] = objY;
				writePos(builder.header,mousePos[0],mousePos[1]);
				return [objX,objY];
			}
			// Listen for mouseclicks
			mWin.grp.clips.addEventListener("mousemove",function(event){updateMouse(event)});

			return builder;
		}

		//mWin.layout.layout(true); // Automatically resize the window to fit all content. Can make the window bigger or smaller than previously defined.
		funky(mWin.grp); // Add functionality to elements
		return mWin;
	}

	function showGUI(gui){
		if(gui!=null && gui instanceof Window){
			gui.center();
			gui.show();
			//gui.close();
		}
		return gui;
	}
	var runGUI = theGUI(thisObj); //runs the theGUI() function, so the script can show it:
	showGUI(runGUI) //shows the contents of the theGUI() function on screen and centers it.
}
standardWin(this);