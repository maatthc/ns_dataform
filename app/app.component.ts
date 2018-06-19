import { Component, OnInit } from "@angular/core";
import { Settings } from './settings';
import * as fs from "file-system";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent { 
    private _settings: Settings;
    private _settingsMetadata: any;

    constructor(){
        let currentDate = new Date();
        console.log(currentDate.toDateString());
        let documents = fs.knownFolders.currentApp();
        let jsonSettingsFile = documents.getFile('./settings-metadata.json');
        jsonSettingsFile.readText().then((content)=>{
            try {
                // console.dir(content);
                this._settingsMetadata = JSON.parse(content);
            } catch (err) {
                throw new Error('Could not parse JSON file' + err.toString());
            }
        });
    }

    ngOnInit() {
        this._settings = {
            name: "You name",
            dateBirth: "Tue Jun 19 2018",
            email: "your@email",
            sex: "",
            loyalty: 0,
            phone: 0,
            profileImageFileName: "profile.png",
        };
        console.dir(this._settings);
    }

    get settings(): Settings {
        return this._settings;
    }
    
    get settingsMetadata(): any {
        return this._settingsMetadata;
    }
}
