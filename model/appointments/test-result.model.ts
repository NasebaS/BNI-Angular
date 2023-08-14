export class TestResult {
  fileName: string;
  fileLink: string;

  static getLabResults(labResults): TestResult[] {
    let results: TestResult[] = [];
    labResults.forEach((result) => {
      let labResult = new TestResult();
      labResult.fileName = result.fileName;
      labResult.fileLink = result.fileLink;
      results.push(labResult);
    });
    return results;
  }
}
