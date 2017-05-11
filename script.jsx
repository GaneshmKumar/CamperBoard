var Table = Reactable.Table;
var unsafe = Reactable.unsafe;

class Header extends React.Component {
    render() {
        return (
            <header>
            <h1>FCC Campers Leaderboard</h1>
            </header>
            );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <footer>
        <a href="https://github.com/ganeshmkumar" target="_blank">GaneshmKumar</a>
        </footer>
            );
    }
}

class LeaderBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }
    formatData(data) {
        var users = [];
        for(var i = 0; i < data.length; i ++)
        {
            var temp = {};
            temp['#'] = i + 1;
            temp['Avatar'] = unsafe('<img class="img img-responsive img-circle avatar" src="' + data[i].img + '" />');
            temp['Camper Name'] = unsafe('<a target="_blank" href="' + this.props.camperURL + data[i].username + '">' + data[i].username + '</a>');
            temp['Last 30 Days'] = data[i].recent;
            temp['All Time'] = data[i].alltime;
            temp['Last Updated'] = data[i].lastUpdate.split('T')[0];
            users.push(temp);
        }
        return users;
    }
    getData() {
        $.ajax({
            url: this.props.apiURL,
            method: 'GET',
            cache: false,
            dataType: 'json',
            success: function(data) {
                var users = this.formatData(data);
                this.setState({users: users});
            }.bind(this),
            error: function(data) {
                //alert(JSON.stringify(data));
            }.bind(this)
        });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <Table  className="table" data={this.state.users} sortable={true} filterable={['Camper Name']} >
            </Table>
            );
    }
}

class Application extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <LeaderBoard apiURL="https://fcctop100.herokuapp.com/api/fccusers/top/recent" camperURL="https://www.freecodecamp.com/" />
                <Footer />
            </div>
            );
    }
}

ReactDOM.render(<Application />, document.getElementById('main'));