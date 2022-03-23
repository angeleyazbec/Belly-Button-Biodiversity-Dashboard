function dropdown(){

  var names = d3.select("#selDataset")

// Get the Samples json data
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

// Displaying the metadata data by ID

function metadata(sample_id) {

  var meta = d3.select("#sample-metadata")

  d3.json("././samples.json").then(function(data) {
    //console.log(data);

    // filter based on the value of the sample
    var demographics = data.metadata;
    var demo_array= demographics.filter(sample_object => sample_object.id == sample_id);
    console.log(demo_array);
    
// Displaying key-value pair that is selected
    var result= demo_array[0];
    console.log(result);
    meta.html("");

    // using object entries to obtain value-key pairs
    Object.entries(result).forEach(([key, value]) => {
      meta.append("h6").text(`${key}:${value}`);
    })

})
}

// Building the bar chart
function buildBarChart(sample)
{
    d3.json("././samples.json").then((data) => {
        // grab the sample data
        let sampleData = data.samples;
        
        //filter based on the value of the sample
        let result2 = sampleData.filter(sampleResult => sampleResult.id == sample);
        // grabbing index 0 from array
        let resultData2 = result2[0];

        //obtain the otu_ids, otu_labels, and sample values
        let otu_ids = resultData2.otu_ids;
        let otu_labels = resultData2.otu_labels;
        let sample_values = resultData2.sample_values;
        
        //build the bar chart
        let yTicks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0,10);
        let textLabels = otu_labels.slice(0,10);

        //creating the parameters for the chart
        let barChart = {
            y: yTicks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h",
            marker: {
              color: 'rgba(32,243,200,0.75)',
              width: 1
            }
        }
        
        let layout = {
            title: "Top 10 Belly Button Microbes"
        }

        Plotly.newPlot("bar", [barChart], layout);
    }); 

}

// Building the Bubble Chart
function buildBubbleChart(sample)

{
    d3.json("././samples.json").then((data) => {
        // grab the sample data
        let sampleData = data.samples;

        //filter based on the value of the sample
        let result2 = sampleData.filter(sampleResult => sampleResult.id == sample);
        // grabbing index 0 from array
        let resultData2 = result2[0];

        //obtain the otu_ids, otu_labels, and sample values
        let otu_ids = resultData2.otu_ids;
        let otu_labels = resultData2.otu_labels;
        let sample_values = resultData2.sample_values;
        //console.log(otu_ids);

        //build the bubble chart
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Electric"
            }
        }
        
        //creating the parameters for the chart
        let layout = {
            title: "Microbial Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        }

        Plotly.newPlot("bubble", [bubbleChart], layout);
    }); 

}

//function that updates the dashboard
function optionChanged(sample_one)
{
  metadata(sample_one);
  buildBarChart(sample_one);
  buildBubbleChart(sample_one);
}


