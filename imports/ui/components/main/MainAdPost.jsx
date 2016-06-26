import React,{ Component, PropTypes } from 'react';

class MainAdPost extends Component{
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
            "height": 90,
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
			<li className="ls-main-post ls-main-ad-post">
				<div ref="adContainer" className="ls-main-post-inner">
				</div>
			</li>
		);
	}
} 

export default MainAdPost;