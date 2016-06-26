import React, {Component} from 'react';

class MainSidebarAd extends Component{
	componentDidMount(){
		if (window.CHITIKA === undefined) {
            window.CHITIKA = {
                'units': []
            };
        };
        var container = $(this.refs.adContainer);
        var width = container.width();
        var unit = {
            "calltype": "async[2]",
            "publisher": "vamsikracha",
            "width": width,
            "height": width,
            "sid": "Chitika Default"
        };

        var placementId = window.CHITIKA.units.length;
        $(this.refs.adContainer).attr('id','chitikaAdBlock-'+placementId);
        window.CHITIKA.units.push(unit);
		$.ajax({
		  url: '//cdn.chitika.net/getads.js',
		  dataType: "script",
		});
	}
	render(){
		return(
			<div ref="adContainer" className="ls-main-sidebar-ad"></div>
		);
	}
} 

export default MainSidebarAd;