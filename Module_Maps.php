<?php
/**
 * Maps API helper.
 * 
 * @see GDO_Postion - A geolocation GDOType.
 * @author gizmore
 * @since 4.0
 * @version 5.0
 */
final class Module_Maps extends GWF_Module
{
	public $module_priority = 45;
	
	public function onLoadLanguage() { return $this->loadLanguage('lang/maps'); }
	
	public function getClasses() { return ['GWF_Position', 'GDO_Position']; }
	
	public function getConfig()
	{
		return array(
			GDO_Secret::make('maps_api_key')->max(64)->initial('AIzaSyBrEK28--B1PaUlvpHXB-4MzQlUjNPBez0'),
			GDO_Checkbox::make('maps_sensors')->initial('1'),
		);
	}
	public function cfgApiKey() { return $this->getConfigValue('maps_api_key'); }
	public function cfgSensors() { return $this->getConfigValue('maps_sensors'); }

	public function onIncludeScripts()
	{
		GWF_Javascript::addJavascript($this->googleMapsScriptURL());
		$this->addJavascript('js/gwf-location-bar-ctrl.js');
		$this->addJavascript('js/gwf-location-picker.js');
		$this->addJavascript('js/gwf-map-util.js');
		$this->addJavascript('js/gwf-position-ctrl.js');
		$this->addJavascript('js/gwf-position-srvc.js');
		$this->addCSS('css/gwf-maps.css');
	}
	
	public function googleMapsScriptURL()
	{
		$protocol = GWF_Url::protocol();
		$sensors = $this->cfgSensors() ? 'true' : 'false';
		$apikey = $this->cfgApiKey();
		if (!empty($apikey))
		{
			$apikey = '&key='.$apikey;
		}
		return sprintf('%s://maps.google.com/maps/api/js?sensors=%s%s', $protocol, $sensors, $apikey);
	}
	
	###############
	### Sidebar ###
	###############
	public function onRenderFor(GWF_Navbar $navbar)
	{
		if ($navbar->isRight())
		{
			$navbar->addField(GDO_Template::make()->module($this)->template('maps-navbar.php'));
		}
	}
	
}
