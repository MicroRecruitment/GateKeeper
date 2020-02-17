var counter_one = 1;
var counter_two = 1;
const f1_opts = [
  'exp1',
  'exp2',
  'exp3',
  'exp4',
];
const f1_select = jQuery(
  '<select></select>',
  {
    class: 'apply',
    id: '1',
    required: 'required',
  }
);
f1_opts.forEach((f1_opt) => {;
  let f1_select_opt = jQuery(
    '<option></option>',
    {
      value: f1_opt,
      text: f1_opt,
    }
  );
  f1_select.append(f1_select_opt);
});
const f1_input = jQuery(
  '<input/>',
  {
    class: 'apply',
    type: 'number',
    min: '0',
    name: 'experience',
    placeholder: 'Years of experience',
    required: 'required',
  }
);
const f1_addbut = jQuery(
  '<button/>',
  {
    class: "another",
    text: '+',
  }
);
/*  const f1_rembut = jQuery(
  '<button/>',
  {
    id: "minus1",
    text: '-',
  }
);  */
function f1_select_change_func() {
  let used = new Set;
  $('#f1 select').each(function() {
    let reset = false;
    $('option', this).each(function() {
      let hide = used.has($(this).val());
      if (hide && $(this).is(':selected')) reset = true;
      $(this).prop('hidden', hide);
    });
    if (reset) $('option:not([hidden]):first', this).prop('selected', true);
    used.add($('option:selected', this).val());
  });
};
f1_select.change(f1_select_change_func);
$('#f1').append(f1_select).append(f1_input);    // add initial field
$('#b1').on('click', function (event) {       //on click, add up to 4 fields
  event.preventDefault();
  if (counter_one < 4){
    f1_select_clone = f1_select.clone();
    f1_select_clone.change(f1_select_change_func);
    f1_input_clone = f1_input.clone();
//    f1_rembut_clone = f1_rembut.clone();
    $('#f1').append(f1_select_clone).append(f1_input_clone);
    f1_select.trigger('change');
    counter_one++;
    if(counter_one == 4) $("#b1").remove();
  }// else{
//    $("#b1").remove();
//  }
  return;
})

const f2_inputFrom = jQuery(
  '<input/>',
  {
    class: 'apply',
    type: 'text',
    name: 'fromDate',
    pattern: '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])',
    id: "#",
    placeholder: 'Avail. from yyyy-mm-dd',
    required: 'required',
  }
);
const f2_inputTo = jQuery(
  '<input/>',
  {
    class: 'apply',
    type: 'text',
    name: 'toDate',
    pattern: '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])',
    id: "#",
    placeholder: 'Avail. to yyyy-mm-dd',
    required: 'required',
  }
);
//  const f2_button = jQuery(
//    '<button/>',
//    {
//      id: "minus2",
//      text: '-',
//    }
//  );
$('#f2').append(f2_inputFrom).append(f2_inputTo);
$('#b2').on('click', function (event) {
  event.preventDefault();
  if(counter_two <= 3){
    f2_inputFrom_clone = f2_inputFrom.clone();
    f2_inputTo_clone = f2_inputTo.clone();
  //    f2_button_clone = f2_button.clone();
    $('#f2').append(f2_inputFrom_clone).append(f2_inputTo_clone);
    counter_two++;
    if(counter_two == 3) $("#b2").remove();
  }
  return;
})
