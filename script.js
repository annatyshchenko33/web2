document.addEventListener("DOMContentLoaded", function() {
    const startScreen = document.getElementById("startScreen");
    const startButton = document.getElementById("startButton");
 
    const game = document.querySelector(".game");
    const scoreDisplay = document.getElementById("scoreValue");
    const bestResultsDiv = document.getElementById("bestResults");
    const worstResultsDiv = document.getElementById("worstResults");
    const container = document.querySelector(".container");
    startButton.addEventListener("click", function() {
      startScreen.style.display = "none"; 
      game.style.display = "block"; 
      score = 0;
      scoreDisplay.textContent = score;
     
 
    });
    const sparkle=document.getElementById("sparkle");
    const cat = document.getElementById("cat");
    const paw = document.getElementById("paw");
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    let score = 0;
  


    document.addEventListener("keydown", function(event) {
        jump();
    });

    function jump() {
        if (cat.classList != "jump") {
            cat.classList.add("jump");
        }
        setTimeout(function() {
            cat.classList.remove("jump");
        }, 300);
        score++;
        scoreDisplay.textContent = score;
        document.getElementById("scoreValue").textContent = score;
      
    }

    function createSparkle() {
        
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        
        document.querySelector(".game").appendChild(sparkle);
     
       
        const catTop = parseInt(window.getComputedStyle(cat).getPropertyValue("top"));
        const catLeft = parseInt(window.getComputedStyle(cat).getPropertyValue("left"));
       
       
        
        setTimeout(() => {
            
            const sparkleTop = parseInt(window.getComputedStyle(sparkle).getPropertyValue("top"));
            const sparkleLeft = parseInt(window.getComputedStyle(sparkle).getPropertyValue("left"));
    
            
            if (sparkleLeft <= catLeft + 60 && sparkleLeft >= catLeft - 10 && catTop >=140) {
                
                score += 10;
                scoreDisplay.textContent = score;
                document.getElementById("scoreValue").textContent = score;
            }
    
            sparkle.remove(); 
        }, 1000); 
    }
    
    
    setInterval(createSparkle, 5000);
    

    let isAlive = setInterval(function(){
        let catTop = parseInt(window.getComputedStyle(cat).getPropertyValue("top"))
        let pawLeft = parseInt(window.getComputedStyle(paw).getPropertyValue("left"))
        let catLeft = parseInt(window.getComputedStyle(cat).getPropertyValue("left"))
        if (pawLeft <= catLeft + 60 && pawLeft >= catLeft - 10 && catTop >= 140) {
         
          scores.push(score);
          localStorage.setItem("scores", JSON.stringify(scores));
          scores.sort((a, b) => b - a);
  
          displayScores();
          score = 0;
         
           game.style.display = "none";
          startScreen.style.display = "block";
        
        }
      }, 10)

      function displayScores() {
        bestResultsDiv.innerHTML = "<h3>Top 3 Scores:</h3>";
        worstResultsDiv.innerHTML = "<h3>Bottom 3 Scores:</h3>";
   
        scores.slice(0, 3).forEach((s, i) => {
            bestResultsDiv.innerHTML += `<p>${i + 1}.Score: ${s}</p>`;
        });
    
        const nonZeroScores = scores.filter(score => score !== 0); 
    const sortedUniqueNonZeroScores = nonZeroScores.filter((score, index, array) => array.indexOf(score) === index); 
    const sortedUniqueWorstScores = sortedUniqueNonZeroScores.sort((a, b) => a - b); 
    const worstScores = sortedUniqueWorstScores.slice(0, 3); 
    worstScores.forEach((s, i) => {
        worstResultsDiv.innerHTML += `<p>${i + 1}.Score: ${s}</p>`;
    });
    container.style.border = "4px solid";
    container.style.borderImage = "linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)";
    container.style.borderImageSlice = "1";
container.style.borderRadius = "10px";
      }
    
   
});

