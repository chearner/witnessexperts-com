/**
 * Expert witness categories for WitnessExperts.com
 * Structure based on legal expert witness directories
 */
export interface Category {
	slug: string;
	name: string;
	description?: string;
	subcategories?: string[];
	expertCount?: number;
}

export const mainCategories: Category[] = [
	{
		slug: 'accidents-injuries-safety',
		name: 'Accidents / Injuries / Safety',
		expertCount: 127,
		subcategories: [
			'Accident Reconstruction',
			'Carbon Monoxide Poisoning',
			'Alarms',
			'Amusement Parks',
			'Aquatics Safety & Water Rescue',
			'Asbestos',
			'Automotive',
			'Aviation',
			'Biomechanics',
			'Building Codes',
			'Bus & Truck Safety',
			'Child Seat Restraints',
			'Ergonomics',
			'Elevator & Escalator',
			'Fire & Explosion Investigation',
			'Firearms and Ballistics',
			'Forklifts',
			'Hazardous Materials',
			'Human Factors',
			'Ladders & Scaffolds',
			'Maritime and Admiralty',
			'Motorcycle',
			'Premises Liability',
			'Products Liability',
			'Safety Engineering',
			'Slips and Falls',
			'Sports & Recreation Injuries',
			'Traffic Engineering',
			'Traumatic Brain Injury',
			'Workplace Accidents'
		]
	},
	{
		slug: 'automotive-aviation-marine',
		name: 'Automotive / Aviation / Marine',
		expertCount: 89,
		subcategories: [
			'Accident Reconstruction',
			'Airlines',
			'Automobile Dealerships',
			'Bicycles',
			'Boating and Watersports',
			'Cruise Lines',
			'Highway Construction',
			'Maritime and Admiralty',
			'Motorcycle',
			'Railroads',
			'Seat Belts & Air Bags',
			'Supply Chain & Warehousing',
			'Tires',
			'Transportation'
		]
	},
	{
		slug: 'business-financial',
		name: 'Business & Financial',
		expertCount: 156,
		subcategories: [
			'Accounting',
			'Actuarial',
			'Banking',
			'Bankruptcy',
			'Business Valuations',
			'Contract Disputes',
			'Copyrights',
			'Economic Damages',
			'Forensic Accounting',
			'Fraud',
			'Insurance',
			'Intellectual Property',
			'Labor Law and Compliance',
			'Lost Profits',
			'Mergers & Acquisitions',
			'Patents & Trademarks',
			'Real Estate Commercial',
			'Securities',
			'Taxation'
		]
	},
	{
		slug: 'chemical-environmental-energy',
		name: 'Chemical / Environmental / Energy',
		expertCount: 94,
		subcategories: [
			'Asbestos',
			'Biochemistry',
			'Chemistry & Chemicals',
			'Coal & Mining',
			'Environmental',
			'Geology',
			'Hazardous Materials',
			'Hydrology',
			'Industrial Hygiene',
			'Lead Poisoning',
			'Mold and Indoor Air Quality',
			'Petroleum & Petrochemicals',
			'Pollution',
			'Weather / Meteorology'
		]
	},
	{
		slug: 'computers-technology',
		name: 'Computers / Internet & Technology',
		expertCount: 72,
		subcategories: [
			'Artificial Intelligence',
			'Computer Evidence Discovery',
			'Cyber Security',
			'E-commerce',
			'Information Technology',
			'Internet',
			'Photography & Visual Evidence',
			'Semiconductors',
			'Software',
			'Software - Trade Secrets'
		]
	},
	{
		slug: 'construction-architecture',
		name: 'Construction & Architecture',
		expertCount: 118,
		subcategories: [
			'Architecture',
			'Building Codes',
			'Building Materials',
			'Concrete & Cement',
			'Construction Claims',
			'Electrical Codes',
			'Floor Failure Analysis',
			'Home Inspections',
			'HVAC',
			'Landscape Design',
			'Plumbing & HVAC',
			'Project Management',
			'Roofing & Waterproofing',
			'Structural Engineering',
			'Zoning & Land Use'
		]
	},
	{
		slug: 'documents-handwriting',
		name: 'Documents & Handwriting',
		expertCount: 34,
		subcategories: [
			'Document Examination',
			'Fingerprint Identification',
			'Handwriting',
			'Ink Dating'
		]
	},
	{
		slug: 'engineering-science',
		name: 'Engineering & Science',
		expertCount: 142,
		subcategories: [
			'Acoustics',
			'Aerospace Engineering',
			'Chemical Engineering',
			'Civil Engineering',
			'Electrical Engineering',
			'Fire Protection Engineering',
			'Forensic Sciences',
			'Geotechnical Engineering',
			'Materials Science',
			'Mechanical Engineering',
			'Metallurgy',
			'Physics',
			'Product Reliability',
			'Traffic Engineering'
		]
	},
	{
		slug: 'medical',
		name: 'Medical',
		expertCount: 287,
		subcategories: [
			'Anesthesiology',
			'Cardiology',
			'Chiropractic',
			'Critical Care',
			'Dental',
			'Emergency Medicine',
			'Forensic Medicine',
			'Gastroenterology',
			'Geriatrics',
			'Internal Medicine',
			'Medical Malpractice',
			'Neurology',
			'Nursing',
			'Obstetrics / Gynecology',
			'Oncology',
			'Orthopedic Surgery',
			'Pathology',
			'Pediatrics',
			'Psychiatry',
			'Psychology',
			'Radiology',
			'Sports Medicine',
			'Toxicology',
			'Traumatic Brain Injury'
		]
	},
	{
		slug: 'real-estate',
		name: 'Real Estate',
		expertCount: 67,
		subcategories: [
			'Appraisal',
			'Broker Conduct',
			'Commission Disputes',
			'Development',
			'Escrow',
			'Leasing',
			'Property Management',
			'Title Insurance',
			'Zoning & Land Use'
		]
	},
	{
		slug: 'human-resources',
		name: 'Human Resources',
		expertCount: 45,
		subcategories: [
			'ADA Compliance',
			'Employment',
			'Labor Law',
			'Negligent Hiring',
			'Sexual Harassment',
			'Wrongful Termination'
		]
	},
	{
		slug: 'insurance',
		name: 'Insurance',
		expertCount: 78,
		subcategories: [
			'Bad Faith',
			'Claims Handling',
			'Disability Claims',
			'Property & Casualty',
			'Professional Liability',
			'Reinsurance',
			'Structured Settlements'
		]
	},
	{
		slug: 'investigative-forensic',
		name: 'Investigative & Forensic',
		expertCount: 56,
		subcategories: [
			'Crime Scene',
			'Electronic Surveillance',
			'Firearms and Ballistics',
			'Jury Consultants',
			'Lie Detection / Polygraph',
			'Photography & Visual Evidence',
			'Voice Identification'
		]
	},
	{
		slug: 'police-penal',
		name: 'Police & Penal',
		expertCount: 41,
		subcategories: [
			'Corrections',
			'Deadly Force',
			'Law Enforcement',
			'Police Practices',
			'Prison Standards',
			'Search & Seizure'
		]
	},
	{
		slug: 'psychiatry-psychology',
		name: 'Psychiatry & Psychology',
		expertCount: 63,
		subcategories: [
			'Behavioral Health',
			'Child Custody Evaluation',
			'Mental Health',
			'Neuropsychology',
			'PTSD',
			'Vocational Rehabilitation'
		]
	}
];

export function getCategoryBySlug(slug: string): Category | undefined {
	return mainCategories.find((c) => c.slug === slug);
}

export function getAllSubcategories(): { category: string; subcategory: string }[] {
	const result: { category: string; subcategory: string }[] = [];
	for (const cat of mainCategories) {
		for (const sub of cat.subcategories ?? []) {
			result.push({ category: cat.name, subcategory: sub });
		}
	}
	return result;
}
