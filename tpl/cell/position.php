<?php $field instanceof GDO_Position;
$pos = $field->getGDOValue(); $pos instanceof GWF_Position;
if ($pos->empty())
{
	l('unknown');
}
else
{
	printf('<span>%s<br/>%s</span>', $pos->displayLat(), $pos->displayLng());
}
