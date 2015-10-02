// Standard window preset
{
var rootDir = "/d/FYNN/scripting/ae_library_files/ROOT/STUFF/"
// var rootF = new File(File.openDialog("Select all frames you wanna import...",true));
// alert(rootF);
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
				currentFrame: StaticText{text:'',characters:5}\
			}\
			grid: Panel{orientation:'row',size:['whatever','400'],alignChildren:['left','top'],\
				text:'Clips',\
			}\
		}"
		
		mWin.grp = mWin.add(res); // Uncomment this line to use the contents of the res string.

		//    F U N C T I O N A L I T Y
		function funky(builder){ // Input main group that contains elements to add functionality to
			builder.size = [500,500] // Window Size
			var tileSize = [250,200];

			//    F I L E S
			// Contains all stacks on this page:
			// stacks[group[stack[[stack],current,poster]]]
			// 
            // access single frames in your area:
            // stacks[0][1][0][frame]
            // 
            var stacks = []
            var clips = 0;
            //    ADD FILES TO GRID
			function loadCatalog(rootDir){
				var file1 = rootDir+"Fireball_Day_04"
				var file2 = rootDir+"Fireball_Day_05"
				populateGrid(file1,builder.grid);
				populateGrid(file2,builder.grid);
			}
			loadCatalog(rootDir);
			alert(stacks[0][0]);
			//open image sequence and add it to the UI;
			function populateGrid(filePath,parent){
				// Make user choose files
				var fileP = new Folder(filePath);
				var file = fileP.getFiles();
				// Create container group
				var iGroup = parent.add('panel',undefined);
					iGroup.size = tileSize;
					iGroup.orientation = 'stack';
					iGroup.alignChildren = ['center','top'];
					iGroup.text = file.name; //call the group the same name as the clip
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
				// Listen for mouseclicks
				iGroup.addEventListener("mousemove",function(event){updateFrame(event,clips)});
				clips++;
				return group;
			}

			function updateFrame(e,clip){
				var mouseX = updateMouse(e)[0];
				var width = stacks[clip][0].size[0];
				var numImgs = stacks[clip][1][0].length;
				var newFrame = Math.floor(mouseX/width*numImgs);
				var getCurFrame = stacks[clip][1][2];
				builder.header.currentFrame.text = newFrame.toString();
				stacks[clip][1][0][getCurFrame].hide();
				stacks[clip][1][2] = newFrame; //set current frame to newFrame
				stacks[clip][1][2] = newFrame; //set groups
				stacks[clip][1][0][newFrame].show();
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
				clearOutput();
				writeLn('xPos: '+objX+' yPos: '+objY); // Debug info
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