interface CodeObject {
  nodejs: string;
  python: string;
}

interface ApiDocumentationSection {
  heading: string;
  description: string;
  code: CodeObject;
}

interface APIDocumentation {
  [key: string]: ApiDocumentationSection;
}

const API_DOCUMENTATION: APIDocumentation = {
  bmi: {
    heading: "BMI",
    description: `<h1 class="text-white">
    Body mass index (BMI) is a measure of body fat based on height and
    weight that applies to adult men and women.
  </h1>
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
  },
  bmr: {
    heading: "",
    description: "",
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
  },
};

export default API_DOCUMENTATION;
