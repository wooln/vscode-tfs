/* global console */
/* global decodeURIComponent */
/* global JSON */

var vscode = require('vscode');

var common = {
  /**
   * Get the latest release of vscode-tfs and warn user in case of update.
   * 
   * @module  Common Utilities
   * @version 0.5.0
   */
  checkLastRelease: function() {
    var https   = require('https'),
        version = 'v' + require('../../package.json').version;
    
    var options = {
      hostname: 'api.github.com',
      path: '/repos/ivangabriele/vscode-tfs/releases/latest',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Vscode-Tfs'
      }
    };
    
    https
      .get(options, function(response) {
        var content = '';
        
        response.on('data', function(chunk) {
          content += chunk.toString();
        })
        
        response.on('end', function() {
          var jsonContent = JSON.parse(content);
          
          if (version !== jsonContent.tag_name) {
            var promise = vscode.window.showWarningMessage('TFS: A new version (' + jsonContent.tag_name + '), is available.', { title: 'Update Now' });
            
            promise.then(function(action) {
              if (!action) {
                return;
              }
              
              vscode.commands.executeCommand('workbench.extensions.action.listOutdatedExtensions');
            });
          }
        })
      })
      .on('error', function(error) {
        console.error(error);
      });
  },
  
  /**
   * Get the current opened file path.
   * 
   * @module  Common Utilities
   * @version 0.5.0
   * 
   * @return {String} File path
   */
  getCurrentFilePath: function() {
    if (!vscode.window.activeTextEditor) {
      return false;
    }
    
    var currentFilePath = vscode.window.activeTextEditor.document.uri.toString();

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
