const handleCategory = async () => {
    const response = await fetch(" https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json();
    //    console.log(data);
  
    const tabContainer = document.getElementById("card-container");
  
    data.data.forEach((category) => {
        //    console.log(category);
  
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="handleLoadNews('${category.category_id}')" class="btn hover:bg-red-600 hover:text-white">${category.category}</button>
        `
        tabContainer.appendChild(div);
  
        //    console.log(data.data);
  
    });
  }
  
  let prevClickedSortedId = '1000';
  
  const handleLoadNews = async (categoryId, isSorted) => {
    // console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const fullData = data.data;
  
    prevClickedSortedId = categoryId;
  
    // changed here======================================
  
   
  
    const cardContainer = document.getElementById("news-card-container");
    cardContainer.innerHTML = "";
  
    const noVideo = document.getElementById("no-video");
    if (fullData.length == 0) {
        // console.log(data.data);
  
        noVideo.innerHTML ="";
        const div = document.createElement("div");
        div.innerHTML = `
         <div class="flex items-center justify-center mt-28 m-10">
         <img src="./images/Icon.png" alt="">
         </div>
         <h1 class="text-3xl font-bold text-black">Oops!! Sorry, there is no <br> content here</h1>
         `
        noVideo.appendChild(div);
  
  
    } else {
      if(isSorted){
        
        fullData.sort((a, b) => {
          console.log(a);
          const x = parseInt(a.others.views.replace('K', '')) * 1000;
          const y = parseInt(b.others.views.replace('K', '')) * 1000;
          return y - x;
          
      });
      }
      noVideo.innerHTML = '';
  
        fullData.forEach((news) => {
            // console.log(news.others.posted_date)
  
            const div = document.createElement("div");
            div.innerHTML = `
              <div class="card m-0 bg-base-100 shadow-xl h-72">
              <figure class="m-0 relative" ><img class="" src=${news.thumbnail}  alt="" />
                  <div class="absolute right-4 bottom-4 rounded l-2 bg-black text-white text-xs pr-2 pl-2">${(news?.others?.posted_date) ? convertSecToTime (news?.others?.posted_date) : ''}</div>
                  </figure>
              <div class="flex gap-2 mt-5 m-auto">
                <div class="">
                  <img class="rounded-full w-10 h-10" src=${news?.authors[0].profile_picture} alt="">
                </div>
  
                <div class="">
                  <h1 class="text-base font-bold">${news.title}</h1>
                  <div class="flex gap-5 text-sm mt-3">
                      <p class="">${news.authors[0].profile_name}</p>
                      <img class="h-5" src="${news.authors[0].verified ? 'images/blue tick.jpg' : ''}" >
  
                  </div>
                  <p class="text-sm mt-3 mb-8">${news.others.views ? news.others.views : "No view"}  views</p>
                </div>
              </div>
            </div>
              `
  
            cardContainer.appendChild(div);
        });
    }
  
  
  };
  
  
  // ==================changed here
  
  // const sort = (datas) => {
  //   console.log(datas);
  //   datas.sort((a, b) => {
  //       console.log(a);
  //       const x = parseInt(a.others.views.replace('K', '')) * 1000;
  //       const y = parseInt(b.others.views.replace('K', '')) * 1000;
  //       return y - x;
  //   });
  //   // je function theke card show kortechen sei function k call korte hbe (displayCard) er jaygay..
  //   handleLoadNews(datas);
  // };
  
  
  handleCategory();
  handleLoadNews("1000");
  
  document.getElementById('sorted-by-view').addEventListener('click', function () {
    // sort(fullData);
  
  
    handleLoadNews(prevClickedSortedId, true)
  
    
  });
  
  
  
  const convertSecToTime = (sec) => {
    var sec = parseInt(sec);
    var hrs = Math.floor(sec / 3600);
    var mins = Math.floor((sec % 3600) / 60);
  
    return (`${hrs}hrs ${mins}min ago `);
  }
  
  
  
  