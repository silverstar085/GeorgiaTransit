if('serviceWorker' in navigator) 
{
    
  navigator.serviceWorker.register('sw.js', 
    { scope: './'}).then(function(registration) 
    {
      
      if(!navigator.serviceWorker.controller)
      {
          return;
      }
      
      if(registration.waiting)
      {
          index.controller._updateReady();
          return;
      }
      if(registration.installing)
      {
          indexController._trackInstalling(registration.installing);
          return;
      }
      
      console.log('Service worker registered!');
    })
    .catch(function(error) {
      console.log('There was an error!');
    });
};


