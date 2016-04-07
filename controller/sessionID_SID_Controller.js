/**
 * Created by Naut on 05-Apr-16.
 */
var SessionID_SID = require('../model/sessionID_SIDModel');

var SessionID_SID_Ctrl = {
    addConnection : function (sessionID,SID) {
        var newSessionID_SID = new SessionID_SID();
        newSessionID_SID.sessionID = sessionID;
        newSessionID_SID.SID = SID;
        newSessionID_SID.save(function (err) {
            if(err){
                console.log(err);
            }
        })
    },
    removeConnection : function (SID) {
        SessionID_SID.remove({SID: SID}, function (err) {
            if(err){
                console.log(err);
            }
        })
    },
    dropTable: function(){
        //remove all data in collection
        SessionID_SID.remove({}, function (err) {
            if(err){
                console.log(err);
            }
        })
    }
};

module.exports = SessionID_SID_Ctrl;