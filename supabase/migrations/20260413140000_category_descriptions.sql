-- Litigation-focused category blurbs for the expert witness directory UI and SEO.

update public.categories
set description = 'Expert analysis for personal injury, premises liability, and occupational safety matters—including accident reconstruction, causation, and recognized standards for hazard identification and control.'
where slug = 'accidents-injuries-safety';

update public.categories
set description = 'Specialists for transportation litigation covering motor-vehicle crashes, aviation incidents, and marine casualties, including reconstruction, human factors, maintenance, and regulatory context.'
where slug = 'automotive-aviation-marine';

update public.categories
set description = 'Opinions on accounting, auditing, economics, valuation, and corporate conduct for commercial fraud, contract, securities, bankruptcy, and lost-profits disputes at deposition and trial.'
where slug = 'business-financial';

update public.categories
set description = 'Testimony and consulting on chemical exposure, environmental contamination, remediation, process safety, and energy-sector operations and compliance in toxic tort and property-damage cases.'
where slug = 'chemical-environmental-energy';

update public.categories
set description = 'Guidance on software, systems architecture, cybersecurity, electronic discovery, and digital evidence for technology-related claims, trade-secret matters, and disputes over data integrity.'
where slug = 'computers-technology';

update public.categories
set description = 'Analysis of design and construction defects, schedule and delay claims, building codes, and professional practice among owners, contractors, architects, and engineers in complex build disputes.'
where slug = 'construction-architecture';

update public.categories
set description = 'Forensic examination of questioned documents, signatures, handwriting, and alterations to support authentication, authorship, and chain-of-custody issues in civil and criminal proceedings.'
where slug = 'documents-handwriting';

update public.categories
set description = 'Technical opinions on mechanical and structural failures, industrial incidents, materials science, and applied physics and chemistry central to product liability and casualty litigation.'
where slug = 'engineering-science';

update public.categories
set description = 'Clinical perspective on diagnosis, treatment, causation, prognosis, and standard of care for malpractice, personal injury, toxic exposure, and disability matters before judges and juries.'
where slug = 'medical';

update public.categories
set description = 'Expertise on valuation, brokerage standards, disclosure obligations, leasing, development, and land-use issues that arise in real-property litigation, arbitration, and regulatory proceedings.'
where slug = 'real-estate';

update public.categories
set description = 'Workplace-focused analysis of policies, investigations, compensation, classification, and HR practice standards in wrongful termination, discrimination, wage-and-hour, and ERISA-related disputes.'
where slug = 'human-resources';

update public.categories
set description = 'Industry perspective on underwriting, claims handling, reserving, coverage interpretation, and insurer custom and practice in coverage disputes and bad-faith litigation.'
where slug = 'insurance';

update public.categories
set description = 'Investigative and forensic support—including scene work, witness development, and evidence documentation—to help trial teams build a coherent factual record in sensitive or high-stakes matters.'
where slug = 'investigative-forensic';

update public.categories
set description = 'Opinions on law-enforcement tactics, use of force, policies and training, and correctional custody standards in civil rights, excessive-force, and criminal-defense contexts.'
where slug = 'police-penal';

update public.categories
set description = 'Mental-health expertise on emotional injury, damages, trauma response, competency, sanity, and behavioral issues that courts and fact-finders rely on in civil and criminal cases.'
where slug = 'psychiatry-psychology';
