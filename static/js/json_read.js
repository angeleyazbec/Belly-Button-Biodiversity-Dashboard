function dropdown(){

  var names = d3.select("#selDataset")

//  1. Get the Samples json data
d3.json("././samples.json").then(function(data) {
  //console.log(data);
  var sample_names = data.names
  sample_names.forEach(sample => {
    names.append("option")
    .text(sample)
    .property("value", sample)
    
  });
  var first_sample = sample_names[0];
  metadata(first_sample)
});

}
dropdown()

function metadata(sample_id) {

  var meta = d3.select("#sample-metadata")

  d3.json("././samples.json").then(function(data) {
    //console.log(data);

    var demographics = data.metadata;
    var demo_array= demographics.filter(sample_object => sample_object.id == sample_id);
    console.log(demo_array);
    
    var result= demo_array[0];
    console.log(result);
    meta.html("");
    Object.entries(result).forEach(([key, value]) => {
      meta.append("h6").text(`${key}:${value}`);
    })

})
}
function optionChanged(sample_one)
{
  metadata(sample_one)
}

