
import isPassing, { computeAverage } from "./gradeUtils.js";

const enrollees = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

// Simulate getting data from a registrar API
const getEnrollees = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(enrollees);
    }, 1000);
  });
};

// Rest operator collects the scores into an array
const getScores = (name, ...scores) => {
  return { name, scores };
};

const generateReport = async () => {
  try {
    const records = await getEnrollees();

    // Spread operator creates a copy of the array
    const recordsCopy = [...records];

    // Demonstrate the rest operator
    const sampleScores = getScores("Ana Cruz", 85, 90, 88);
    console.log("Rest operator example:", sampleScores);

    // Map creates a new array containing averages and statuses
    const results = recordsCopy.map(
      ({ name, prelim, midterm, final }) => {
        const average = computeAverage(prelim, midterm, final);
        const status = isPassing(average) ? "PASSING" : "PROBATION";

        return { name, average, status };
      }
    );

    // Filter separates passing and probation enrollees
    const passingEnrollees = results.filter(
      ({ status }) => status === "PASSING"
    );

    const probationEnrollees = results.filter(
      ({ status }) => status === "PROBATION"
    );

    // Reduce calculates the class average
    const classAverage =
      results.reduce((total, { average }) => total + average, 0) /
      results.length;

    // Template literals format the report
    let report = "=== IT313 Enrollment Eligibility Report ===\n";

    results.forEach(({ name, average, status }) => {
      report += `${name} - Average: ${average.toFixed(2)} - ${status}\n`;
    });

    report += `Class Average: ${classAverage.toFixed(2)}\n`;
    report += `Passing: ${passingEnrollees.length} / ${results.length}`;

    console.log("\n" + report);
    console.log(`Enrollees on probation: ${probationEnrollees.length}`);
  } catch (error) {
    console.error(
      `Failed to retrieve enrollee records: ${error.message}`
    );
  }
};

generateReport();
