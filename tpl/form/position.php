<?php $field instanceof GDO_Position; ?>
<md-input-container
 class="md-block md-float md-icon-left<?php echo $field->classError(); ?>"
 flex ng-controller="GWFPositionCtrl"
 ng-init='init(<?php echo json_encode($field->initJSON()); ?>)'>
  <label for="form[<?php echo $field->name; ?>]"><?php echo $field->displayLabel(); ?></label>
  <?php echo GDO_Icon::iconS('position'); ?>
  <input
   ng-click="onPick()"
   type="text"
   ng-model="data.display"
   <?php echo $field->htmlRequired(); ?>
   <?php echo $field->htmlDisabled(); ?>/>
  <div class="gwf-form-error"><?php echo $field->displayError(); ?></div>
  
  <input type="hidden" name="form[<?php echo $field->name ?>_lat]" value="{{data.lat}}" />
  <input type="hidden" name="form[<?php echo $field->name ?>_lng]" value="{{data.lng}}" />
  
</md-input-container>
