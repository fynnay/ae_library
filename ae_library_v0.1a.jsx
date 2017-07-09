// Standard window preset
{
var rootDir = "/Volumes/Verbinski/02_SCRIPTING/After_Effects/stockholm/ROOT/EXPLOSIONS"
// var rootF = new File(File.openDialog("Select all frames you wanna import...",true));
function standardWin(thisObj){
	function theGUI(thisObj){
		// Check if the script is run from the Window menu or from the file menu as an external script.
		// The window will only be resizable if run from the window menu.
		if(thisObj instanceof Panel){
			var mWin = thisObj;
		}else{
			var mWin = (thisObj instanceof Panel)? thisObj : new Window("palette","StockHelm", undefined, {resizable:true});
		}
        //    R E S O U R C E    S T R I N G
		// Add stuff to the res string, to create well aligned layouts.
		var res =
		"group{orientation:'column',alignChildren:['fill','top']\
			header: Group{orientation:'column',alignChildren:['center','top']\
				xPos: StaticText{text:'',characters:10}\
				yPos: StaticText{text:'',characters:10}\
				currentFrame: StaticText{text:'',characters:5}\
			}\
			grid: Panel{orientation:'row',size:['whatever','400'],alignChildren:['left','top'],\
				text:'Clips',\
			}\
		}"
		
		mWin.grp = mWin.add(res); // Uncomment this line to use the contents of the res string.

		//    F U N C T I O N A L I T Y
		function funky(builder){ // Input main group that contains elements to add functionality to
			builder.size = [1000,500] // Window Size
			var tileSize = [250,200];

			//    F I L E S
			// Contains all stacks on this page:
			// stacks[group[stack[[imageSequence][frames],current,poster]]]
			// 
            // access single frames in your area:
            // stacks[0][1][0][frame]
            // 
            var clips = -1;
            var stacks = [];
            //    ADD FILES TO GRID
			function loadCatalog(rootDir){
				var file1 = rootDir+"/Fireball_side_01/"
				var file2 = rootDir+"/Fireball_side_02/"
				addToGrid(file1,builder.grid);
				addToGrid(file2,builder.grid);
				// Add mouse over event handler:
				stacks[0][0].addEventListener("mousemove",function(event){updateFrame(event,0)});
				stacks[1][0].addEventListener("mousemove",function(event){updateFrame(event,1)},true);
			}
			loadCatalog(rootDir);
			var accessGroup = stacks[1][1][0][0]; //stack,clip,images,frame

			//open image sequence and add it to the UI;
			function addToGrid(filePath,parent){
				// Make user choose files
				var fileP = new Folder(filePath);
				alert(fileP);
				var file = fileP.getFiles('*.jpg');
				if(file!=''){
					// Create container group
					clips+=1;
					var iGroup = parent.add('panel',undefined);
						iGroup.size = tileSize;
						iGroup.orientation = 'stack';
						iGroup.alignChildren = ['center','top'];
						iGroup.text = file.name; //call the group the same name as the clip
						iGroup.name = file.name+'_'+clips;
					var inputImages = file.toString().split(','); //convert the input string into an array
					var images = []; //contains all imported images as UIelements
					for(i=0;i<inputImages.length;i++){
						var newIMG = iGroup.add('image',undefined,inputImages[i]);
							clipSize = newIMG.image.size;
							scale = (clipSize[0]-tileSize[0])/100
							add = 20
							newIMG.size = [clipSize[0]/scale+add,clipSize[1]/scale+add];
							newIMG.hide();
							images.push(newIMG);
					}
					var btn = iGroup.add('button')
						btn.text = file.name;
						btn.alignment = ['fill','bottom'];
					var stack = []
					var posterFrame = Math.ceil(images.length/2-1); //Frame to be shown by default
					stack.push(images,posterFrame,posterFrame);
					stack[0][posterFrame].show()
					var group = [];
					group.push(iGroup,stack);
					stacks.push(group);
					return group;
				}
			}

			function updateFrame(e,clip){
				var mouseX = updateMouse(e)[0]; // Get mouse X position over object
				if(clip==0){
					var width = stacks[clip][0].size[0]; // Get group's x-size
				}else{
					var width = stacks[clip][1][0][0].size[0]; // Get first frames x-size;
				}
				var numImgs = stacks[clip][1][0].length-1; // Number of frames in the stack
				var newFrame = Math.floor(mouseX/width*numImgs);
				var getCurFrame = stacks[clip][1][2]; // Get current frame
				// Update which frame is shown
				stacks[clip][1][0][getCurFrame].hide();
				stacks[clip][1][2] = newFrame; //set current frame to newFrame
				//stacks[clip][1][2] = newFrame; //set groups
				stacks[clip][1][0][newFrame].show();
				builder.header.currentFrame.text = newFrame.toString(); //display number of current frame in header StaticText
			}
			//   M O U S E   P O S I T I O N
			var mousePos = [0,0]
			function writePos(builder,mouseX,mouseY){
				with(builder){
					xPos.text = 'x: '+mouseX;
					yPos.text = 'y: '+mouseY;
				};
			}
			writePos(builder.header,mousePos[0],mousePos[1]);

			function updateMouse(e){
				var objX = e.clientX.toString();
				var objY = e.clientY.toString();
				//clearOutput();
				//writeLn('xPos: '+objX+' yPos: '+objY); // Debug info
				mousePos[0] = objX;
				mousePos[1] = objY;
				writePos(builder.header,mousePos[0],mousePos[1]);
				return [objX,objY];
			}
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

}