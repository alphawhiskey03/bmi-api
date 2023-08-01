interface CodeObject {
  nodejs: string;
  python: string;
}

interface ApiDocumentationSection {
  heading: string;
  description: string;
  code: CodeObject;
  response: string;
}

interface APIDocumentation {
  [key: string]: ApiDocumentationSection;
}

const API_DOCUMENTATION: APIDocumentation = {
  bmi: {
    heading: "BMI",
    description: `<div class="m-2 text-base dark:text-white">
    <p class="mb-2">
    This API allows users to calculate Body Mass Index (BMI) and identify the nutrition level based on the BMI value. Users can input their height, age, sex, weight, and preferred unit system (US or metric), and the API will return the BMI value and corresponding body type classification.
  </p>
  <h3 style="margin:15px 0 10px 0;font-weight:bold !important; font-size:20px;">Nutrition level</h3>
  <ul class="list-disc">
  <li class="mb-2">
      <p><strong>Obesity:</strong> BMI indicates obesity, which may suggest the user has excess body fat and potential health risks associated with obesity.</p>
  </li>
  <li class="mb-2">
      <p><strong>Overweight:</strong> BMI indicates overweight, implying the user's weight is higher than the healthy range for their height.</p>
  </li>
  <li class="mb-2">
      <p><strong>Normal:</strong> BMI falls within the healthy range, indicating a balanced weight for the user's height.</p>
  </li>
  <li class="mb-2">
      <p><strong>Thinness:</strong> BMI suggests the user may be underweight, possibly indicating insufficient body weight for their height.</p>
  </li>
  <li class="mb-2">
      <p><strong>Severe Thinness:</strong> BMI indicates severe thinness, which may indicate a critically low body weight.</p>
  </li>
</ul>
  
  </div>
 
  `,
    code: {
      nodejs: `const axios = require("axios");

    const options = {
        method: 'POST',
        url: 'https://bmiapi.com/api/v1/bmi',
        params: {
    "height":'<in CM if "metric" and inches if "us" unit preference>',
    "age":'<1 to 100>',
    "sex":'<male/female>',
    "weight":'<in Kg if metric and pounds if US unit preference>',
    "unitPreference":'<us / metric>'
},
        headers: {
          'Authorization': 'YOUR_API_KEY',
        }
      };
      
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });`,
      python: `import requests

    url = 'https://bmiapi.com/api/v1/bmi'
    api_key = 'YOUR_API_KEY'
    height='<in CM if "metric" and inches if "us" unit preference>'
    age=30
    sex="male"
    weight='<in Kg if metric and pounds if US unit preference>'
    unitPreference='<us / metric>'
    
    headers = {
        'Authorization': api_key
    }
    
    payload = {
        'height': height,
        'age': age,
        'sex': sex,
        'weight': weight,
        'unitPreference':unitPreference
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        print(data)
    else:
        print(f'Request failed with status code {response.status_code}')`,
    },
    response: `{
      "success": true,
      "ageInMonths": 228,
      "height": "6'4",
      "sex": "male",
      "nutritionLevel": "Normal",
      "BMI": 19.47
  }`,
  },
  bmr: {
    heading: "BMR",
    description: `<div class="m-2 text-base dark:text-white">
    <p>
    This API allows users to effortlessly calculate their Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). <br/> BMR represents the number of calories your body needs to maintain basic physiological functions at rest, while TDEE factors in your activity level to estimate the total calories you burn in a day.
    </p>
    </div>`,
    code: {
      nodejs: `const axios = require("axios");

      const options = {
          method: 'POST',
          url: 'https://bmiapi.com/api/v1/bmr',
          params: {
      "height":'<in CM if "metric" and inches if "us" unit preference>',
      "age":'<1 to 100>',
      "sex":'<male/female>',
      "weight":'<in Kg if metric and pounds if US unit preference>',
      "unitPreference":'<us / metric>'
      "activityFactor":'<sedantary / lightlyActive / moderatelyActive / veryActive / extraActive >'

  },
          headers: {
            'Authorization': 'YOUR_API_KEY',
          }
        };
        
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });`,
      python: `import requests

      url = 'https://bmiapi.com/api/v1/bmr'
      api_key = '<YOUR_API_KEY>'
      height='<in CM if "metric" and inches if "us" unit preference>'
      age=30
      sex="male"
      weight='<in Kg if metric and pounds if US unit preference>'
      unitPreference='<us / metric>'
      activityFactor='<sedantary / lightlyActive / moderatelyActive / veryActive / extraActive >'

      
      headers = {
          'Authorization': api_key
      }
      
      payload = {
          'height': height,
          'age': age,
          'sex':sex,
          'weight':weight,
          'unitPreference':unitPreference,
          'activityFactor:activityFactor
      }
      
      response = requests.post(url, headers=headers, json=payload)
      
      if response.status_code == 200:
          data = response.json()
          print(data)
      else:
          print(f'Request failed with status code {response.status_code}')`,
    },
    response: `{
      "success": true,
      "BMR": 1817.24,
      "TDEE": 2180.7
  }`,
  },
};

export default API_DOCUMENTATION;
