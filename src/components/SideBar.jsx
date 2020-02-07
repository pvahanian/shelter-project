import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//install @material-ui/lab, @material-ui/core, @material-ui/icons

const useStyles = makeStyles({

    root: {
        height: 500,
        flexGrow: 1,
        maxWidth: 230,
    },
});

/* alright bitch, here is the plan. make this in a form, make the options for the search found in the
* github project, make the form have a submit button, make the submit display the checked items
*
* Acceptance Criteria
 Lets user toggle/select search keys for city, zip code, gender, etc.
 When data is entered, the values are held in memory and can be output with console.log() style functions
* */
const TreeOptions = () => {
    const classes = useStyles();
    const [gender, setGender] = React.useState('female');
    const [useGender, setUseGender] = React.useState(false);
    const [zip, setZip] = React.useState(null);
    const [useZip, setUseZip] = React.useState(false);
    const [city, setCity] = React.useState(null);
    const [useCity, setUseCity] = React.useState(false);
    const [county, setCounty] = React.useState(null);
    const [useCounty, setUseCounty] = React.useState(false);

    function display() {
        console.log("Use gender? " + String(useGender));
        if(useGender)
            console.log("gender is " + String(gender));
        console.log("Use zip? " + String(useZip));
        if(useZip)
            console.log("zip is " + String(zip));
        console.log("Use city? " + String(useCity));
        if(useCity)
            console.log("city is " + String(city));
        console.log("Use county? " + String(useCounty));
        if(useCounty)
            console.log("county is " + String(county));
    }

    function wSetZip(e) {
        setZip(e.target.value);
    }

    const handleChange = event => {
        setGender(event.target.value);
    };

    return (
        <Grid container >
            <Paper className={classes.root}>
                <TreeView
                    className={classes.root}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    <TreeItem nodeId="1" label="Gender">
                        <FormControlLabel control={<Checkbox
                            onChange={() => {
                                if(useGender === false)
                                    setUseGender(true);
                                else
                                    setUseGender(false);
                            }}/>} label="Search by Gender" />
                        <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleChange}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="t-female" control={<Radio />} label="Transgender Female" />
                            <FormControlLabel value="t-male" control={<Radio />} label="Transgender Male" />
                        </RadioGroup>
                    </TreeItem>
                    <TreeItem nodeId="5" label="Zip code">
                        <FormControlLabel control={<Checkbox
                            onChange={() => {
                                if(useZip === false)
                                    setUseZip(true);
                                else
                                    setUseZip(false);
                            }}/>} label="Search by Zip code" />
                        <TextField
                            id="standard-number"
                            label="Number"
                            type="number"
                            onChange={wSetZip}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </TreeItem>
                    <TreeItem nodeId="6" label="City">
                        <FormControlLabel control={<Checkbox
                            onChange={() => {
                                if(useCity === false)
                                    setUseCity(true);
                                else
                                    setUseCity(false);
                            }}/>} label="Search by city" />
                        <Autocomplete
                            id="cities"
                            options={OregonCities}
                            getOptionLabel={option => option.name}
                            style={{ width: 200 }}
                            onChange={(event, newValue) => {
                                if(newValue) {
                                    setCity(newValue.name);
                                }
                            }}
                            renderInput={params => (
                                <TextField {...params} label="City" variant="outlined" fullWidth/>
                            )}
                        />
                    </TreeItem>
                    <TreeItem nodeId="7" label="County">
                        <FormControlLabel control={<Checkbox
                            onChange={() => {
                                if(useCity === false)
                                    setUseCounty(true);
                                else
                                    setUseCounty(false);
                            }}/>} label="Search by county" />
                        <Autocomplete
                            id="counties"
                            options={Counties}
                            getOptionLabel={option => option.name}
                            style={{ width: 200 }}
                            onChange={(event, newValue) => {
                                if(newValue) {
                                    setCounty(newValue.name);
                                }
                            }}
                            renderInput={params => (
                                <TextField {...params} label="County" variant="outlined" fullWidth/>
                            )}
                        />
                    </TreeItem>
                    <div>
                        <Button onClick={() => {display()}} style={{marginTop: 50}}>test</Button>
                    </div>
                </TreeView>
            </Paper>
        </Grid>
    );
};

export default TreeOptions;


const OregonCities = [
    {name: "Portland"},
    {name: "Salem"},
    {name: "Eugene"},
    {name: "Gresham"},
    {name: "Hillsboro"},
    {name: "Beaverton"},
    {name: "Bend"},
    {name: "Medford"},
    {name: "Springfield"},
    {name: "Corvallis"},
    {name: "Aloha"},
    {name: "Tigard"},
    {name: "Albany"},
    {name: "Keizer"},
    {name: "Lake Oswego"},
    {name: "Grants Pass"},
    {name: "Oregon City"},
    {name: "McMinnville"},
    {name: "Redmond"},
    {name: "Tualatin"},
    {name: "West Linn"},
    {name: "Woodburn"},
    {name: "Forest Grove"},
    {name: "Wilsonville"},
    {name: "Newberg"},
    {name: "Roseburg"},
    {name: "Bethany"},
    {name: "Happy Valley"},
    {name: "Hayesville"},
    {name: "Klamath Falls"},
    {name: "Ashland"},
    {name: "Milwaukie"},
    {name: "Sherwood"},
    {name: "Altamont"},
    {name: "Central Point"},
    {name: "Canby"},
    {name: "Hermiston"},
    {name: "Lebanon"},
    {name: "Cedar Mill"},
    {name: "Pendleton"},
    {name: "Dallas"},
    {name: "Four Corners and Oak Grove"},
    {name: "Coos Bay"},
    {name: "Troutdale"},
    {name: "The Dalles"},
    {name: "St. Helens"},
    {name: "Oatfield"},
    {name: "La Grande"},
    {name: "Cornelius"},
    {name: "Gladstone"},
    {name: "Oak Hills"},
    {name: "Sandy"},
    {name: "Ontario"},
    {name: "Damascus"},
    {name: "Newport"},
    {name: "Silverton"},
    {name: "Monmouth"},
    {name: "Cottage Grove"},
    {name: "Prineville"},
    {name: "Independence"},
    {name: "Astoria"},
    {name: "Sweet Home"},
    {name: "North Bend"},
    {name: "Baker City"},
    {name: "Bull Mountain"},
    {name: "Rockcreek"},
    {name: "Eagle Point"},
    {name: "Fairview"},
    {name: "Molalla"},
    {name: "Florence"},
    {name: "White City"},
    {name: "Lincoln City"},
    {name: "Stayton"},
    {name: "Jennings Lodge"},
    {name: "West Haven-Sylvan"},
    {name: "Sutherlin"},
    {name: "Cedar Hills"},
    {name: "Hood River"},
    {name: "West Slope"},
    {name: "Scappoose"},
    {name: "Green"},
    {name: "Umatilla"},
    {name: "Milton-Freewater"},
    {name: "Madras"},
    {name: "Seaside"},
    {name: "Talent"},
    {name: "Brookings"},
    {name: "Garden Home-Whitford"},
    {name: "Sheridan"},
    {name: "Junction City"},
    {name: "Deschutes River Woods"},
    {name: "Roseburg North"},
    {name: "Raleigh Hills"},
    {name: "Warrenton"},
    {name: "Winston"},
    {name: "Creswell"},
    {name: "Tillamook"},
    {name: "Veneta"},
    {name: "Mount Hood Village"},
    {name: "Philomath"},
    {name: "Phoenix"},
    {name: "Lafayette"},
    {name: "Beavercreek"},
    {name: "Aumsville"},
    {name: "Reedsport"},
    {name: "Wood Village"},
    {name: "Tri-City"},
    {name: "King City"},
    {name: "Coquille"},
    {name: "Three Rivers"},
    {name: "Metzger"},
    {name: "Harrisburg"},
    {name: "Toledo"},
    {name: "Mount Angel"},
    {name: "Warm Springs"},
    {name: "Hubbard"},
    {name: "Estacada"},
    {name: "Myrtle Creek"},
    {name: "Boardman"},
    {name: "Jefferson"},
    {name: "Oakridge"},
    {name: "Dundee"},
    {name: "Nyssa"},
    {name: "Bandon"},
    {name: "Shady Cove"},
    {name: "Sublimity"},
    {name: "Jacksonville"},
    {name: "Burns"},
    {name: "Dayton"},
    {name: "Gervais"},
    {name: "Sisters"},
    {name: "Mulino"},
    {name: "Redwood"},
    {name: "Myrtle Point"},
    {name: "Rogue River"},
    {name: "Lakeview"},
    {name: "Gold Beach"},
    {name: "Vernonia"},
    {name: "Millersburg"},
    {name: "Willamina"},
    {name: "Waldport"},
    {name: "Union"},
    {name: "North Plains"},
    {name: "Carlton"},
    {name: "Turner"},
    {name: "Chenoweth"},
    {name: "Stanfield"},
    {name: "Columbia City"},
    {name: "Banks"},
    {name: "Barview"},
    {name: "Rainier"},
    {name: "Stafford"},
    {name: "Harbor"},
    {name: "Enterprise"},
    {name: "Cave Junction"},
    {name: "Canyonville"},
    {name: "Mill City"},
    {name: "Durham"},
    {name: "La Pine"},
    {name: "Warren"},
    {name: "Eagle Crest"},
    {name: "Odell"},
    {name: "Clatskanie"},
    {name: "Vale"},
    {name: "Brownsville"},
    {name: "Irrigon"},
    {name: "Elgin"},
    {name: "Lakeside"},
    {name: "Cannon Beach"},
    {name: "Amity"},
    {name: "Grand Ronde"},
    {name: "John Day"},
    {name: "Merlin"},
    {name: "Gearhart"},
    {name: "Culver"},
    {name: "Lincoln Beach"},
    {name: "Hines"},
    {name: "Glide"},
    {name: "Bunker Hill and Terrebonne"},
    {name: "Pilot Rock"},
    {name: "New Hope"},
    {name: "Depoe Bay"},
    {name: "Rose Lodge"},
    {name: "Rockaway Beach"},
    {name: "Dunes City"},
    {name: "Bay City"},
    {name: "Tangent"},
    {name: "Gold Hill"},
    {name: "Heppner"},
    {name: "Siletz"},
    {name: "Lyons"},
    {name: "Riddle"},
    {name: "Drain"},
    {name: "Yamhill"},
    {name: "Cascade Locks"},
    {name: "Williams"},
    {name: "Port Orford"},
    {name: "Athena"},
    {name: "Coburg"},
    {name: "Lowell"},
    {name: "Joseph"},
    {name: "Yoncalla"},
    {name: "Donald"},
    {name: "Falls City"},
    {name: "Aurora"},
    {name: "Island City"},
    {name: "Scio"},
    {name: "Halsey"},
    {name: "Pacific City"},
    {name: "Sunriver"},
    {name: "Oakland"},
    {name: "Lookingglass"},
    {name: "Glendale"},
    {name: "Netarts"},
    {name: "Prairie City"},
    {name: "Kerby"},
    {name: "Adair Village"},
    {name: "Mission"},
    {name: "Maywood Park"},
    {name: "Merrill"},
    {name: "Crabtree"},
    {name: "Malin and Lacomb"},
    {name: "Garibaldi"},
    {name: "Wallowa"},
    {name: "Brooks"},
    {name: "Metolius"},
    {name: "Yachats"},
    {name: "Ruch"},
    {name: "Chiloquin"},
    {name: "Bayside Gardens"},
    {name: "Gaston"},
    {name: "South Lebanon and Echo"},
    {name: "Trail"},
    {name: "Condon"},
    {name: "Foots Creek"},
    {name: "Powers"},
    {name: "Melrose"},
    {name: "Canyon City"},
    {name: "Manzanita"},
    {name: "Monroe"},
    {name: "Weston"},
    {name: "Parkdale and Cove"},
    {name: "Dufur"},
    {name: "Johnson City"},
    {name: "Dillard"},
    {name: "Arlington"},
    {name: "Selma"},
    {name: "Glasgow"},
    {name: "Tumalo"},
    {name: "Pine Hollow"},
    {name: "Mount Vernon"},
    {name: "Gates"},
    {name: "Prospect"},
    {name: "Nesika Beach"},
    {name: "Takilma"},
    {name: "Tetherow"},
    {name: "Mosier"},
    {name: "Tutuilla"},
    {name: "St. Paul"},
    {name: "North Powder"},
    {name: "Crawfordsville, Fossil, and Butte Falls"},
    {name: "Shedd"},
    {name: "Maupin"},
    {name: "Wheeler"},
    {name: "Huntington"},
    {name: "Wimer"},
    {name: "Bonanza"},
    {name: "Haines"},
    {name: "Wasco"},
    {name: "Scotts Mills"},
    {name: "Winchester Bay"},
    {name: "Rivergrove"},
    {name: "Gopher Flats"},
    {name: "Marion"},
    {name: "Adams"},
    {name: "Cloverdale"},
    {name: "Sodaville"},
    {name: "Umapine and Gardiner"},
    {name: "Oceanside and Ione"},
    {name: "Labish Village"},
    {name: "Days Creek"},
    {name: "Imbler"},
    {name: "Deer Island"},
    {name: "Moro and Seventh Mountain"},
    {name: "Black Butte Ranch"},
    {name: "Idaville"},
    {name: "Nehalem"},
    {name: "Alsea"},
    {name: "Halfway"},
    {name: "O'Brien and Jeffers Gardens"},
    {name: "Holley"},
    {name: "Westfir"},
    {name: "Annex"},
    {name: "Fair Oaks"},
    {name: "Camp Sherman"},
    {name: "Waterloo"},
    {name: "Rufus"},
    {name: "Lexington"},
    {name: "Paisley"},
    {name: "Mount Hood"},
    {name: "Detroit"},
    {name: "Rowena"},
    {name: "Lostine"},
    {name: "Seneca"},
    {name: "Sumpter and Westport"},
    {name: "Tygh Valley"},
    {name: "Elkton"},
    {name: "Brogan"},
    {name: "Hebo"},
    {name: "Neskowin"},
    {name: "Ukiah"},
    {name: "Long Creek"},
    {name: "Helix"},
    {name: "Cascadia"},
    {name: "Jordan Valley, Adrian, and Richland"},
    {name: "Riverside"},
    {name: "Idanha"},
    {name: "Grass Valley"},
    {name: "Peoria"},
    {name: "Spray"},
    {name: "Barlow"},
    {name: "Dayville"},
    {name: "Mehama"},
    {name: "Summerville"},
    {name: "Kirkpatrick"},
    {name: "Butteville and Kings Valley"},
    {name: "Alpine and West Scio"},
    {name: "Pistol River"},
    {name: "Mitchell"},
    {name: "Monument"},
    {name: "Fort Hill and Harper"},
    {name: "Crane"},
    {name: "Cape Meares"},
    {name: "Summit"},
    {name: "Bellfountain"},
    {name: "Pine Grove"},
    {name: "Government Camp"},
    {name: "New Pine Creek"},
    {name: "Cayuse"},
    {name: "Rickreall, Langlois, and Beaver"},
    {name: "Neahkahnie and Silver Lake"},
    {name: "Unity"},
    {name: "Blodgett"},
    {name: "Wamic"},
    {name: "Prescott"},
    {name: "Antelope"},
    {name: "Plush"},
    {name: "Shaniko"},
    {name: "Wallowa Lake and Granite"},
    {name: "Juntura"},
    {name: "Biggs Junction"},
    {name: "Pronghorn"},
    {name: "Lonerock"},
    {name: "Greenhorn"},
];

const Counties = [
    {name: "Baker County"},
    {name: "Benton County"},
    {name: "Clackamas County"},
    {name: "Clatsop County"},
    {name: "Columbia County"},
    {name: "Coos County"},
    {name: "Crook County"},
    {name: "Curry County"},
    {name: "Deschutes County"},
    {name: "Douglas County"},
    {name: "Gilliam County"},
    {name: "Grant County"},
    {name: "Harney County"},
    {name: "Hood River County"},
    {name: "Jackson County"},
    {name: "Jefferson County"},
    {name: "Josephine County"},
    {name: "Klamath County"},
    {name: "Lake County"},
    {name: "Lane County"},
    {name: "Lincoln County"},
    {name: "Linn County"},
    {name: "Malheur County"},
    {name: "Marion County"},
    {name: "Morrow County"},
    {name: "Multnomah County"},
    {name: "Polk County"},
    {name: "Sherman County"},
    {name: "Tillamook County"},
    {name: "Umatilla County"},
    {name: "Union County"},
    {name: "Wallowa County"},
    {name: "Wasco County"},
    {name: "Washington County"},
    {name: "Wheeler County"},
    {name: "Yamhill County"},
]