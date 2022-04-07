function id1(id)
{
    //function name is id h it return id element when we call by passing id
  return document.getElementById(id);
}

function qsa(selector)
{
  // we can input query selector here and input the class
  return document.querySelectorAll(selector);
}

//we are gonna fill up the board
const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298",
  ];
  const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895",
  ];
  const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841",
  ];

var timer;
var timeremaining;
var lives;
var selectnum;
var selectedtile;
var disableselect;

  window.onload= function(){
   // syntax nothing we can do
   //run start game function when button is clicked
   //**** */ master trick in this we when input new in id it will return we added event listner to it and asked for startgame funn
   id1("start-button1").addEventListener('click',startgame);
   for(let i=0;i<id1("number_container").children.length;i++)
   {
        id1("number_container").children[i].addEventListener("click",function(){
        //this here points to number container
        //here !disable select means not true means false
        // console.log(this);
            if(!disableselect)
            {
                // console.log(this);
                //disableselect is false mtlb something is selected to agar selected hua h to remove kro if something is previously selected 
                if(this.classList.contains("selected"))
                {//agar kuch bhe selected h to vo this hojayega
                this.classList.remove("selected");
                selectnum=null;//number bhe khali kro
                }
                else
                {
                for(let i=0;i<id1("number_container").children.length;i++)
                {
                    id1("number_container").children[i].classList.remove("selected");
                }
                // now selecting it 
                this.classList.add("selected");
                selectnum=this;
                //now setting up for the move
                updatemove();
                }
            }
        })
    }
};

function startgame()
{
    // console.log("inside");
    let board;
    //1st it will choose difficulty
    if (id1("easy1").checked)
    {
    //   console.log("easy game selected");
      board = easy[0];
    }
    if (id1("medium1").checked)
    {
    //   console.log("medium game selected");
      board = medium[0];
    }
    if (id1("hard1").checked)
    {
    //   console.log("hard game selected");
      board = hard[0];
    }
    //now about setting lives
    lives = 3;
    //disable select will disable the selection
    disableselect = false;
    id1("lives").textContent="Lives Remaining: 3";
    // console.log("bhg bs");
    // WILL DISPLAY LIVES AND WE CAN ADD TEXT LATER FROM JS ALSO
    // console.log("=====", board);
    generateboard(board);
    //will display timer now
    starttime();
    // now setting up the theme
    if(id1("dark1").checked)
    {
    //   console.log("inside the dark checked");
      document.body.classList.add("dark");
      id1("footer1").classList.add("footercolor");
      id1("footer1").style.backgroundColor="#333";
      document.getElementsByClassName("div1").style.color="white";
      // document.getElementsByTagName(body).style.color = "white";
      // id(body).classList.remove("Lightbackground");
    }
    else
    {
    //   console.log("inside the dark unchecked");
      document.body.classList.remove("dark");
    //   id("footer1").style.backgroundColor="white";
      // id(body).classList.add("Lightbackground");
      //isme agar puri body p apply krna h to document.body kro vo pura body classlist p apply krega or fir hoga 
    }  
    id1("number_container").style.display="flex";//zeher property    
}

function starttime()
{
  if(id1("timing").checked)
  {
    timeremaining=180;
  }
  else if(id1("timing1").checked)
  {
    timeremaining=600;
  }
  else
  {
    timeremaining=900;
  }
  //coverting time in minutes
  //timer is more of a variable for time that is made
  id1("timer").textContent=timeconversion(timeremaining);
  //code for the very first second
  timer = setInterval(function(){
    //isme 2 cheeze jayengi interval(in mili seconds) jiske bad vo funcn execute hoga or vo fucn khud
    timeremaining--;
    //now if no time is Remaining
    // console.log("timeremaining k pehle h");
    if(timeremaining==0)
    {
      // console.log("insisde the if of time");
      endgame();
      // break;
    }
    id1("timer").textContent=timeconversion(timeremaining);
  },1000);
}

function timeconversion(time)
{
  let minutes=Math.floor(time/60);
  if(minutes<10)
  {
    minutes="0" + minutes;
  }
  let seconds=time%60;
  if(seconds<10)
  {
    seconds="0"+seconds;
  }
  return minutes+ ":" + seconds;
}

function endgame()
{
  //we will disable timer and moves
  disableselect=true;
  clearTimeout(timer);
  if(lives==0||timeremaining==0)
  {
    id1("lives").textContent="You Lose!";
  }
  else
  {
    id1("lives").textContent="You Won!"
  }
}

function checkdone()
{
  let tiles=qsa(".tile");
  for(let i=0;i<tiles.length;i++)
  {
    if(tiles[i].textContent=="")
    {return false;}
  }
  return true;
}

function generateboard(board)
{
  // console.log("aagaye");
  //clearing previous bord
  clearprevious();
  //now we will make idcount
  let idcount = 0;
  //creating 9*9 tiles
  for (let i = 0; i < 81; i++)
  {
    //we are making a tiles in the form of paragraph
    let tile = document.createElement("p"); //will create a paragraph
    if (board.charAt(i) != "-")
    {
      tile.textContent = board.charAt(i);
    }
    else
    {
      //we will add a click event listner here
      tile.addEventListener("click",function(){
        //disableselect is false means somenumber is already selected in that container
        if(!disableselect)
        {
          //it is selected for now
            if(tile.classList.contains("selected"))
            {
              //then we will first let it deselect
              tile.classList.remove("selected");
              selectedtile=null;
            }
            else
            {
              //agar kuch bhe selected nhi h mtlb deselect true h to
              //incase someting is selected
              for(let i=0;i<81;i++)
              {
                qsa(".tile")[i].classList.remove("selected");
              }
              //now adding selection if selected
              tile.classList.add("selected");
              selectedtile=tile;
              updatemove();
            }
        }
      })
    }
    //we will give id to every tile
    tile.id = idcount;
    //increment it every time
    idcount++;
    //now we want to update tile to class of every tile
    tile.classList.add("tile");

    if ((tile.id > 17 && tile.id < 27 )||( tile.id > 44 && tile.id < 54))
    {
      tile.classList.add("bottomborder");
    }
    if ((tile.id+1 )% 9 == 3 || (tile.id+1) % 9 == 6)
    {
      tile.classList.add("rightborder");
    }
    id1("board").appendChild(tile);
  }
}

function updatemove()
{
  //move will only happen when both tile and nc are selected
  if(selectedtile!=null&&selectnum!=null)
  {
    selectedtile.textContent=selectnum.textContent;
    // now if the number matches in the selection code
    if(checkcorrect(selectedtile))
    {
      //now we need to deselect the old selected tile as after putting the number in the tile deselecting it 
      selectedtile.classList.remove("selected");
      selectnum.classList.remove("selected");
      //clearing the selected varibales
      selectedtile=null;
      selectnum=null;
      if(checkdone())
      {
        endgame();
      }
      //if the number does not match the solution
    }
    else
    {
      // we will disable select for one instance as we want user to have a look at the number for once
       disableselect = true;
       //making the tile turn red
       selectedtile.classList.add("incorrect");
       //now setting up timeut function
       setTimeout(function(){
         //as the answer is wrong lives will decrease
         lives--;
         //now if no lives left end the game 
         if(lives==0)
         {
           endgame();
         }
         else if(lives!=0)
         {
           //update lives text
           id1("lives").textContent="Lives Remaining : " + lives;
           //renable selecting numbers and tiles
           disableselect=false;
           //now we are gonna restore the original colour of tile and remove selected from tile and number container
           selectedtile.classList.remove("incorrect");
           selectedtile.classList.remove("selected");
           selectnum.classList.remove("selected");
           //clear the text on the tile
           selectedtile.textContent="";
           selectnum=null;
           selectedtile=null;
          }

       },1000);
    }
  }
}

function checkcorrect(tile)
{
  console.log(tile)
  //setting solution based in the difficulty
  let solution;
  if (id1("easy1").checked)
  {
    console.log("easy");
    solution = easy[1];
  }
  if (id1("medium1").checked)
  {
    console.log("m");
    solution = medium[1];
  }
  if (id1("hard1").checked)
  {
    console.log("h");
    solution = hard[1];
  }
  //now if tiles number is same as solution code number
  if(solution.charAt(tile.id)==tile.textContent)
  {
    return true;
  }
  else
  {
    return false;
  }  
}

function clearprevious()
{
  //access all the tiles first
  let tiles = qsa(".tile"); //will this give array of tiles
  //now we have all the tiles we need to clear the tiles
  for (let i = 0; i < tiles.length; i++)
  {
    tiles[i].remove();
  }
  //if timer is going on clearing the timer
  if(timer)
  {
    clearTimeout(timer);
  } //what does it do?
  //if any numbers are selected there then deselecting it
  for (let i = 0; i < id1("number_container").children.length; i++)
  {
    //childrens of number container
    id1("number_container").children[i].classList.remove("selected"); //they are keywords i.e selected
    //removes the selected elements
  }
  //clear the selectednum and selected tile
  selectedtile = null;
  selectnum = null;
}