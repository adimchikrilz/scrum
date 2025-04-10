// utils/offlineDB.js
// This is a simplified mock of an offline database for verification
// In a real implementation, you would use IndexedDB or similar

const offlineDB = {
    // Mock database for common misinformation claims
    commonClaims: [
      {
        id: "claim1",
        text: "Drinking bleach cures COVID-19",
        verdict: "false",
        explanation: "This claim is false and dangerous. Drinking bleach can cause severe internal injuries and death.",
        sources: ["WHO", "CDC", "Nigerian Ministry of Health"]
      },
      {
        id: "claim2",
        text: "5G network causes coronavirus",
        verdict: "false",
        explanation: "There is no scientific evidence linking 5G technology to the coronavirus. Viruses cannot travel on radio waves/mobile networks.",
        sources: ["WHO", "Nigerian Communications Commission"]
      },
      {
        id: "claim3",
        text: "Nigeria is the largest economy in Africa",
        verdict: "mixed",
        explanation: "By GDP, South Africa and Egypt sometimes surpass Nigeria depending on currency fluctuations and measurement methods.",
        sources: ["World Bank", "IMF"]
      }
    ],
    
    // Mock database for common manipulated images
    knownImages: [
      {
        hash: "img123456",
        verdict: "manipulated",
        originalSource: "https://original-source.com/real-image.jpg",
        manipulation: "Image has been digitally altered to add crowd members"
      },
      {
        hash: "img789012",
        verdict: "out-of-context",
        originalSource: "https://original-source.com/original-context.jpg",
        explanation: "This image is from a 2018 event, not a recent happening as claimed"
      }
    ],
    
    // Mock database for suspicious websites
    suspiciousWebsites: [
      "fakenews.com.ng",
      "nigeria-insider-exclusive.net",
      "breaking-news-247.com"
    ],
    
    // Simple function to search for claims
    searchClaim(text) {
      // In a real app, you'd use more sophisticated text matching
      return this.commonClaims.find(claim => 
        text.toLowerCase().includes(claim.text.toLowerCase())
      );
    },
    
    // Simple function to check if a website is suspicious
    checkWebsite(url) {
      try {
        const domain = new URL(url).hostname;
        return this.suspiciousWebsites.includes(domain);
      } catch (e) {
        return false;
      }
    },
    
    // Mock image hash checking
    // In a real app, you'd compute actual perceptual hashes of images
    checkImage(imageHash) {
      return this.knownImages.find(img => img.hash === imageHash);
    }
  };
  
  export default offlineDB;