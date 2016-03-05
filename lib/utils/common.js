/* global decodeURIComponent */

var vscode = require('vscode');

var common = {
  /**
   * Get the current opened file path.
   * 
   * @module  Common Utilities
   * @version 0.5.0
   * 
   * @return {String} File path
   */
  getCurrentFilePath: function() {
    if (!vscode.window.visibleTextEditors.length) {
      return false;
    }
    
    var currentFilePath = vscode.window.visibleTextEditors[0].document.uri.toString();

    if (currentFilePath.substr(0, 8) !== 'file:///') {
      return false;
    }
      
    currentFilePath = decodeURIComponent(currentFilePath).substr(8);
    
    return currentFilePath;
  },
  
  /**
   * Get the current workspace path.
   * 
   * @module  Common Utilities
   * @version 0.5.0
   * 
   * @return {String} Directory path
   */
  getCurrentWorkspacePath: function() {
    return vscode.workspace.rootPath;
  }
};

module.exports = common;
