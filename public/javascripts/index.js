console.log('entered in the chat');
const canvas = $('#chart')

$('input[name="daterange"]').daterangepicker();
$(function() {

  var start = moment().subtract(29, 'days');
  var end = moment();

  function cb(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }

  $('#reportrange').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
         'Today': [moment(), moment()],
         'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
         'Last 7 Days': [moment().subtract(6, 'days'), moment()],
         'Last 30 Days': [moment().subtract(29, 'days'), moment()],
         'This Month': [moment().startOf('month'), moment().endOf('month')],
         'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
  }, cb);

  cb(start, end);

});




const URL = 'http://localhost:3000/api/v3/app'

fetch(URL).then(res => res.json()).then(res => {
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: res.map(row => row.createdAt.split(' ')[0]),
      datasets: [{
        label: 'Learnings',
        data: res.map(row => row.count),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });})


$('input[name="daterange"]').on('change', async function (e) {
  const dateRange = e.target.value;
  const from = dateRange.split('-')[0].trim()
  const to = dateRange.split('-')[1].trim()
  console.log("date", from, to)
  try {
    const response = await fetch(URL + `?from=${from}&to=${to}`);
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }


})

