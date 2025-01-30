import('./bootstrap').catch((error) => {
    console.error('Failed to load application:', error);
    document.body.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: Arial, sans-serif;
      ">
        <h1>Failed to load application. Please refresh the page.</h1>
      </div>
    `;
  });