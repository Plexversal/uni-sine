self.onmessage = function (e) {
    const { code } = e.data;
  
    let result;
    let finalOutput = [];
  
    // Blacklist specific APIs by overriding them
    self.Worker = undefined;
    self.WebSocket = undefined;
    self.XMLHttpRequest = undefined;
    self.importScripts = undefined;
    
    self.Worker = function () {
      throw new Error("Worker is not allowed");
    };
    self.WebSocket = function () {
      throw new Error("WebSocket is not allowed");
    };
    self.XMLHttpRequest = function () {
      throw new Error("XMLHttpRequest is not allowed");
    };
    self.importScripts = function () {
      throw new Error("importScripts is not allowed");
    };
    
  
    // Override console.log to capture output
    const originalConsoleLog = console.log;
    console.log = (msg) => {
      finalOutput.push(msg);
    };
  
    try {
      // Use new Function to avoid eval (safer alternative)
      result = new Function(code)();
  
      if (result !== undefined) {
        finalOutput.push(result);
      }
    } catch (error) {
      finalOutput.push(`Error: ${error.message}`);
    } finally {
      console.log = originalConsoleLog; // Restore original console.log
      self.postMessage(finalOutput); // Send the result back to the main thread
    }
  };
  