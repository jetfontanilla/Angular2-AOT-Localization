import { Injectable } from "@angular/core";
import { ConnectionFactoryService } from "../../shared/connection-factory.service";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class VocabularyQuizService {

    constructor(private connection: ConnectionFactoryService) {
    }

    getQuizOptions(options: Object,
                   additionalOptions: Object = {}): Object {
        const defaultOptions = {
            maxExamples: 1,
            maxDistractors: 3,
            includeMasteredAndDormant: true,
            personalize: true
        };

        return _.assign({}, defaultOptions, additionalOptions, options);
    }

    getByActivityId(activityId: number,
                    courseId?: number,
                    additionalOptions: Object = {}): Observable<any> {


        let response = {
            "sessionTitle": "Activity Word Quiz",
            "quizWords": [{
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 672,
                    "wordRootID": 401222,
                    "orthography": "AVAILABLE",
                    "wordRootOrthography": "AVAILABLE",
                    "pronunciation": "AH V EY L AH B AH L",
                    "definition": "not too busy to do something",
                    "wordRootDefinitionID": 4774655,
                    "partOfSpeech": "adjective",
                    "audioURL": "https://cdna.englishcentral.com/words/a/available_6506_9398.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 31551,
                    "wordRootID": 90091,
                    "orthography": "IN REALITY",
                    "wordRootOrthography": "IN REALITY",
                    "pronunciation": "IH N SIL R IY AE L AH T IY",
                    "definition": "the truth is different from what was imagined",
                    "wordRootDefinitionID": 2693143,
                    "partOfSpeech": "idiom",
                    "audioURL": "https://cdna.englishcentral.com/words/I/IN_REALITY_201415_35591.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 31175,
                    "wordRootID": 430608,
                    "orthography": "IN THE WORKS",
                    "wordRootOrthography": "IN THE WORKS",
                    "pronunciation": "IH N SIL DH AH SIL W ER K Z",
                    "definition": "in the process of being developed or completed",
                    "wordRootDefinitionID": 4775483,
                    "partOfSpeech": "idiom",
                    "audioURL": "https://cdna.englishcentral.com/words/I/IN_THE_WORKS_207457_71262.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 218,
                    "wordRootID": 405755,
                    "orthography": "ENOUGH",
                    "wordRootOrthography": "ENOUGH",
                    "pronunciation": "IH N AH F",
                    "definition": "as much as is needed",
                    "wordRootDefinitionID": 2810035,
                    "partOfSpeech": "adjective",
                    "audioURL": "https://cdna.englishcentral.com/words/e/enough_36389_2202.mp3"
                }],
                "examples": [{
                    "dialogLineID": 207754,
                    "dialogID": 20316,
                    "sequence": 9,
                    "transcript": "Would you like me to see if a loan officer is available to speak to you?",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/20316/linecliplarge_20316_207754_14438_20130522074448.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/20316/linethumb_20316_207754_14438_20130522074448.jpg",
                    "cueStart": 14438,
                    "cueEnd": 17698,
                    "slowSpeakStart": 21807,
                    "slowSpeakEnd": 26772,
                    "pointsMax": 56,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 322611,
                        "wordHeadID": 672,
                        "wordRootID": 401222,
                        "orthography": "AVAILABLE",
                        "wordRootOrthography": "AVAILABLE",
                        "pronunciation": "AH V EY L AH B AH L",
                        "definition": "not too busy to do something",
                        "wordRootDefinitionID": 4774655,
                        "partOfSpeech": "adjective",
                        "audioURL": "https://cdna.englishcentral.com/words/a/available_6506_9398.mp3"
                    },
                    "dialogTitle": "Getting a Loan"
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 737,
                    "wordRootID": 8404,
                    "orthography": "APPROACHABLE",
                    "wordRootOrthography": "APPROACHABLE",
                    "pronunciation": "AH P R OW CH AH B AH L",
                    "definition": "easy to talk to or deal with",
                    "wordRootDefinitionID": 2628099,
                    "partOfSpeech": "adjective",
                    "audioURL": "https://cdna.englishcentral.com/words/A/APPROACHABLE_4598_74624.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 490,
                    "wordRootID": 417100,
                    "orthography": "TAXI",
                    "wordRootOrthography": "TAXI",
                    "pronunciation": "T AE K S IY",
                    "definition": "to move slowly on the ground before or after flying",
                    "wordRootDefinitionID": 4770034,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/t/taxi_114562_8525.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 35182,
                    "wordRootID": 58952,
                    "orthography": "EN ROUTE",
                    "wordRootOrthography": "EN ROUTE",
                    "pronunciation": "AH N SIL R AW T",
                    "definition": "on the way to some place",
                    "wordRootDefinitionID": 2668816,
                    "partOfSpeech": "adverb",
                    "audioURL": "https://cdna.englishcentral.com/words/e/en_route_132847_26189.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 3270,
                    "wordRootID": 404150,
                    "orthography": "CRUISE",
                    "wordRootOrthography": "CRUISE",
                    "pronunciation": "K R UW Z",
                    "definition": "to move at a steady rate of speed",
                    "wordRootDefinitionID": 2808435,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/C/CREW_S_25292_77178.mp3"
                }],
                "examples": [{
                    "dialogLineID": 150710,
                    "dialogID": 17766,
                    "sequence": 28,
                    "transcript": "Definitely. I also think he's fairly approachable.",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/17766/linecliplarge_17766_150710_107939_20120627110720.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/17766/linethumb_17766_150710_107939_20120627110720.jpg",
                    "cueStart": 107939,
                    "cueEnd": 110491,
                    "slowSpeakStart": 162058,
                    "slowSpeakEnd": 165961,
                    "pointsMax": 46,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 36832,
                        "wordHeadID": 737,
                        "wordRootID": 8404,
                        "orthography": "APPROACHABLE",
                        "wordRootOrthography": "APPROACHABLE",
                        "pronunciation": "AH P R OW CH AH B AH L",
                        "definition": "easy to talk to or deal with",
                        "wordRootDefinitionID": 2628099,
                        "partOfSpeech": "adjective",
                        "audioURL": "https://cdna.englishcentral.com/words/A/APPROACHABLE_4598_74624.mp3"
                    },
                    "dialogTitle": "Problem Solving"
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 787,
                    "wordRootID": 11750,
                    "orthography": "AUTHORITY",
                    "wordRootOrthography": "AUTHORITY",
                    "pronunciation": "AH TH AO R AH T IY",
                    "definition": "the quality to make people respect you",
                    "wordRootDefinitionID": 2630706,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/a/authority_6408_12301.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 29862,
                    "wordRootID": 29931,
                    "orthography": "CHARGE",
                    "wordRootOrthography": "CHARGE",
                    "pronunciation": "CH AA R JH",
                    "definition": "to rush towards something",
                    "wordRootDefinitionID": 2645668,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/c/charge_19106_12058.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 29926,
                    "wordRootID": 14425,
                    "orthography": "BASE",
                    "wordRootOrthography": "BASE",
                    "pronunciation": "B EY S",
                    "definition": "a place that the runner must touch",
                    "wordRootDefinitionID": 2632818,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/b/base_8358_8701.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 304,
                    "wordRootID": 22034,
                    "orthography": "BREAK",
                    "wordRootOrthography": "BREAK",
                    "pronunciation": "B R EY K",
                    "definition": "to lessen in force or effect",
                    "wordRootDefinitionID": 2639035,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/b/brake_13463_13534.mp3"
                }],
                "examples": [{
                    "dialogLineID": 85785,
                    "dialogID": 15490,
                    "sequence": 13,
                    "transcript": "It's tough to be a punk rock hero and to be a good authority figure for your kids.",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/15490/linecliplarge_15490_85785_56695_20120112133456.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/15490/linethumb_15490_85785_56695_20111206101851.jpg",
                    "cueStart": 56695,
                    "cueEnd": 60845,
                    "slowSpeakStart": 85193,
                    "slowSpeakEnd": 91492,
                    "pointsMax": 68,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 133006,
                        "wordHeadID": 787,
                        "wordRootID": 11750,
                        "orthography": "AUTHORITY",
                        "wordRootOrthography": "AUTHORITY",
                        "pronunciation": "AO TH AO R IH T IY",
                        "definition": "the quality to make people respect you",
                        "wordRootDefinitionID": 2630706,
                        "partOfSpeech": "noun",
                        "audioURL": "https://cdna.englishcentral.com/words/a/authority_131489_22581.mp3"
                    },
                    "dialogTitle": "The Other F Word"
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 1941,
                    "wordRootID": 403600,
                    "orthography": "CONSIST",
                    "wordRootOrthography": "CONSIST",
                    "pronunciation": "K AH N S IH S T",
                    "definition": "to be made of something",
                    "wordRootDefinitionID": 2807891,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/C/CONSIST_23192_38940.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 2087,
                    "wordRootID": 10485,
                    "orthography": "ASSURE",
                    "wordRootOrthography": "ASSURE",
                    "pronunciation": "AH SH UH R",
                    "definition": "to make sure that something happens",
                    "wordRootDefinitionID": 4974336,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/a/assure_5814_24309.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 1483,
                    "wordRootID": 402471,
                    "orthography": "CAPTURE",
                    "wordRootOrthography": "CAPTURE",
                    "pronunciation": "K AE P CH ER",
                    "definition": "to catch a person or animal",
                    "wordRootDefinitionID": 4761001,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/c/capture_17163_7576.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 1451,
                    "wordRootID": 403550,
                    "orthography": "CONNECT",
                    "wordRootOrthography": "CONNECT",
                    "pronunciation": "K AH N EH K T",
                    "definition": "to link through a device",
                    "wordRootDefinitionID": 4740510,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/c/connect_23028_20276.mp3"
                }],
                "examples": [{
                    "dialogLineID": 84013,
                    "dialogID": 15471,
                    "sequence": 14,
                    "transcript": "Much of the country consists of a mountain range called the Sierra Madre.",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/15471/linecliplarge_15471_84013_90913_20120112133355.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/15471/linethumb_15471_84013_90913_20111206101832.jpg",
                    "cueStart": 90913,
                    "cueEnd": 97865,
                    "slowSpeakStart": 136519,
                    "slowSpeakEnd": 147022,
                    "pointsMax": 81,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 2956,
                        "wordHeadID": 1941,
                        "wordRootID": 403600,
                        "orthography": "CONSISTS",
                        "wordRootOrthography": "CONSIST",
                        "pronunciation": "K AH N S IH S T S",
                        "definition": "to be made of something",
                        "wordRootDefinitionID": 2807891,
                        "partOfSpeech": "verb",
                        "audioURL": "https://cdna.englishcentral.com/words/c/consists_23202_14312.mp3"
                    },
                    "dialogTitle": "A Geography Lecture on Mexico"
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 1270,
                    "wordRootID": 403444,
                    "orthography": "CONCEPT",
                    "wordRootOrthography": "CONCEPT",
                    "pronunciation": "K AA N S EH P T",
                    "definition": "a general idea",
                    "wordRootDefinitionID": 4738134,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/c/concept_22618_14470.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 3430,
                    "wordRootID": 418226,
                    "orthography": "UPCOMING",
                    "wordRootOrthography": "UPCOMING",
                    "pronunciation": "AH P K AH M IH NG",
                    "definition": "happening or appearing soon",
                    "wordRootDefinitionID": 2822458,
                    "partOfSpeech": "adjective",
                    "audioURL": "https://cdna.englishcentral.com/words/u/upcoming_120618_13461.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 598,
                    "wordRootID": 405744,
                    "orthography": "ENJOYABLE",
                    "wordRootOrthography": "ENJOYABLE",
                    "pronunciation": "EH N JH OY AH B AH L",
                    "definition": "giving pleasure",
                    "wordRootDefinitionID": 2810024,
                    "partOfSpeech": "adjective",
                    "audioURL": "https://cdna.englishcentral.com/words/e/enjoyable_36318_23848.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 1889,
                    "wordRootID": 30364,
                    "orthography": "CHEERFUL",
                    "wordRootOrthography": "CHEERFUL",
                    "pronunciation": "CH IH R F AH L",
                    "definition": "having or showing good spirits",
                    "wordRootDefinitionID": 2646011,
                    "partOfSpeech": "adjective",
                    "audioURL": "https://cdna.englishcentral.com/words/c/cheerful_19399_12928.mp3"
                }],
                "examples": [{
                    "dialogLineID": 16228,
                    "dialogID": 10804,
                    "sequence": 18,
                    "characterID": 994,
                    "transcript": "My concept of freshness is food that is clean and safe.",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/10804/linecliplarge_10804_16228_55750_20130109164306.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/10804/linethumb_10804_16228_55750_20130109164306.jpg",
                    "cueStart": 55750,
                    "cueEnd": 59600,
                    "slowSpeakStart": 83870,
                    "slowSpeakEnd": 89650,
                    "pointsMax": 50,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 82045,
                        "wordHeadID": 1270,
                        "wordRootID": 403444,
                        "orthography": "CONCEPT",
                        "wordRootOrthography": "CONCEPT",
                        "pronunciation": "K AA N S EH P T",
                        "definition": "a general idea",
                        "wordRootDefinitionID": 4738134,
                        "partOfSpeech": "noun",
                        "audioURL": "https://cdna.englishcentral.com/words/c/concept_22618_14470.mp3"
                    },
                    "dialogTitle": "Fresh Flesh?"
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 776,
                    "wordRootID": 16428,
                    "orthography": "BENEFIT",
                    "wordRootOrthography": "BENEFIT",
                    "pronunciation": "B EH N AH F IH T",
                    "definition": "a social event to raise money for a person or cause",
                    "wordRootDefinitionID": 2634441,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/b/benefit_9732_11743.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 1119,
                    "wordRootID": 415263,
                    "orthography": "SECRET",
                    "wordRootOrthography": "SECRET",
                    "pronunciation": "S IY K R AH T",
                    "definition": "something kept hidden",
                    "wordRootDefinitionID": 2819505,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/s/secret_103395_5386.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 1087,
                    "wordRootID": 414811,
                    "orthography": "ROOF",
                    "wordRootOrthography": "ROOF",
                    "pronunciation": "R UW F",
                    "definition": "the cover or top of something",
                    "wordRootDefinitionID": 4730860,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/r/roof_98984_8773.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 771,
                    "wordRootID": 416478,
                    "orthography": "STANDARD",
                    "wordRootOrthography": "STANDARD",
                    "pronunciation": "S T AE N D ER D",
                    "definition": "a level of quality",
                    "wordRootDefinitionID": 2820714,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/s/standard_109905_5474.mp3"
                }],
                "examples": [{
                    "dialogLineID": 80357,
                    "dialogID": 15175,
                    "sequence": 5,
                    "transcript": "A benefit concert raises funds for victims of Texas wildfires.",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/15175/linecliplarge_15175_80357_55797_20130109210451.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/15175/linethumb_15175_80357_55797_20130109210451.jpg",
                    "cueStart": 55797,
                    "cueEnd": 60761,
                    "slowSpeakStart": 83846,
                    "slowSpeakEnd": 91366,
                    "pointsMax": 92,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 139805,
                        "wordHeadID": 776,
                        "wordRootID": 16428,
                        "orthography": "BENEFIT",
                        "wordRootOrthography": "BENEFIT",
                        "pronunciation": "B EH N AH F IH T",
                        "definition": "a social event to raise money for a person or cause",
                        "wordRootDefinitionID": 2634441,
                        "partOfSpeech": "noun",
                        "audioURL": "https://cdna.englishcentral.com/words/b/benefit_9732_11743.mp3"
                    },
                    "dialogTitle": "VOA 60 USA (03 Oct 11): Verdict, Protests, Vehicular Injuries, and Benefit Concert"
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 1628,
                    "wordRootID": 401042,
                    "orthography": "ASSESS",
                    "wordRootOrthography": "ASSESS",
                    "pronunciation": "AH S EH S",
                    "definition": "to make a judgment about something",
                    "wordRootDefinitionID": 2805342,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/A/ASSESS_5740_63072.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 1566,
                    "wordRootID": 405845,
                    "orthography": "ERA",
                    "wordRootOrthography": "ERA",
                    "pronunciation": "EH R AH",
                    "definition": "a period of time",
                    "wordRootDefinitionID": 4766081,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/e/era_36872_20140319113130.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 1510,
                    "wordRootID": 198320,
                    "orthography": "WARNING",
                    "wordRootOrthography": "WARNING",
                    "pronunciation": "W AO R N IH NG",
                    "definition": "something that tells you about possible danger",
                    "wordRootDefinitionID": 4770128,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/w/warning_123895_13110.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 34031,
                    "wordRootID": 135819,
                    "orthography": "PRACTICAL JOKE",
                    "wordRootOrthography": "PRACTICAL JOKE",
                    "pronunciation": "P R AE K T IH K AH L SIL JH OW K",
                    "definition": "a trick played on someone",
                    "wordRootDefinitionID": 2729840,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/P/PRACTICAL_JOKE_226119_202347.mp3"
                }],
                "examples": [{
                    "dialogLineID": 98827,
                    "dialogID": 15869,
                    "sequence": 3,
                    "transcript": "To start with, I'm going to talk about how we can assess the financial strength of a bank.",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/15869/linecliplarge_15869_98827_3625_20120112135826.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/15869/linethumb_15869_98827_3625_20111123041513.jpg",
                    "cueStart": 3625,
                    "cueEnd": 8973,
                    "slowSpeakStart": 5588,
                    "slowSpeakEnd": 13684,
                    "pointsMax": 106,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 314012,
                        "wordHeadID": 1628,
                        "wordRootID": 401042,
                        "orthography": "ASSESS",
                        "wordRootOrthography": "ASSESS",
                        "pronunciation": "AH S EH S",
                        "definition": "to make a judgment about something",
                        "wordRootDefinitionID": 2805342,
                        "partOfSpeech": "verb",
                        "audioURL": "https://cdna.englishcentral.com/words/A/ASSESS_5740_63072.mp3"
                    },
                    "dialogTitle": "Assessing a Bank's Strength"
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 925,
                    "wordRootID": 401070,
                    "orthography": "ASSUME",
                    "wordRootOrthography": "ASSUME",
                    "pronunciation": "AH S UW M",
                    "definition": "to falsely pretend to have or be somebody or something",
                    "wordRootDefinitionID": 2805370,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/a/assume_5804_13525.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 1365,
                    "wordRootID": 403282,
                    "orthography": "COMMIT",
                    "wordRootOrthography": "COMMIT",
                    "pronunciation": "K AH M IH T",
                    "definition": "to give your love or support",
                    "wordRootDefinitionID": 4750912,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/c/commit_22215_10148.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 560,
                    "wordRootID": 403018,
                    "orthography": "CLIMB",
                    "wordRootOrthography": "CLIMB",
                    "pronunciation": "K L AY M",
                    "definition": "the act of moving upward",
                    "wordRootDefinitionID": 2807313,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/c/climb_20978_19332.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 29770,
                    "wordRootID": 401815,
                    "orthography": "BLOW",
                    "wordRootOrthography": "BLOW",
                    "pronunciation": "B L OW",
                    "definition": "a hard hit",
                    "wordRootDefinitionID": 4754566,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/b/blow_11738_2072.mp3"
                }],
                "examples": [{
                    "dialogLineID": 181128,
                    "dialogID": 16254,
                    "sequence": 34,
                    "transcript": "Many Afghan film lovers assumed that the entire film archive was lost.",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/16254/linecliplarge_16254_181128_215633_20130418073656.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/16254/linethumb_16254_181128_215633_20130418073656.jpg",
                    "cueStart": 215633,
                    "cueEnd": 219946,
                    "slowSpeakStart": 323600,
                    "slowSpeakEnd": 330144,
                    "pointsMax": 71,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 13086,
                        "wordHeadID": 925,
                        "wordRootID": 401070,
                        "orthography": "ASSUMED",
                        "wordRootOrthography": "ASSUME",
                        "pronunciation": "AH S UW M D",
                        "definition": "to falsely pretend to have or be somebody or something",
                        "wordRootDefinitionID": 2805370,
                        "partOfSpeech": "verb",
                        "audioURL": "https://cdna.englishcentral.com/words/A/ASSUMED_5805_67228.mp3"
                    },
                    "dialogTitle": "Lost Treasures of Afghanistan: Film Archive"
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 7277,
                    "wordRootID": 400594,
                    "orthography": "ANALYZE",
                    "wordRootOrthography": "ANALYZE",
                    "pronunciation": "AE N AH L AY Z",
                    "definition": "to study something in order to understand it",
                    "wordRootDefinitionID": 4771024,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/a/analyze_3502_30494.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 31075,
                    "wordRootID": 310026,
                    "orthography": "AS OPPOSED TO",
                    "wordRootOrthography": "AS OPPOSED TO",
                    "pronunciation": "AE Z SIL AH P OW Z D SIL T UW",
                    "definition": "in contrast",
                    "wordRootDefinitionID": 2802632,
                    "partOfSpeech": "idiom",
                    "audioURL": "https://cdna.englishcentral.com/words/a/asopposedto_206814_69801.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 3932,
                    "wordRootID": 408865,
                    "orthography": "INSTITUTE",
                    "wordRootOrthography": "INSTITUTE",
                    "pronunciation": "IH N S T AH T UW T",
                    "definition": "to set up or start a system",
                    "wordRootDefinitionID": 2813133,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/i/institute_57431_10842.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 689,
                    "wordRootID": 409099,
                    "orthography": "INVOLVE",
                    "wordRootOrthography": "INVOLVE",
                    "pronunciation": "IH N V AA L V",
                    "definition": "to include",
                    "wordRootDefinitionID": 4740014,
                    "partOfSpeech": "verb",
                    "audioURL": "https://cdna.englishcentral.com/words/i/involve_58275_4930.mp3"
                }],
                "examples": [{
                    "dialogLineID": 92487,
                    "dialogID": 15715,
                    "sequence": 32,
                    "transcript": "The team will now go back to analyze the samples.",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/15715/linecliplarge_15715_92487_129939_20120112134953.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/15715/linethumb_15715_92487_129939.jpg",
                    "cueStart": 129939,
                    "cueEnd": 132549,
                    "slowSpeakStart": 195058,
                    "slowSpeakEnd": 199048,
                    "pointsMax": 49,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 283961,
                        "wordHeadID": 7277,
                        "wordRootID": 400594,
                        "orthography": "ANALYZE",
                        "wordRootOrthography": "ANALYZE",
                        "pronunciation": "AE N AH L AY Z",
                        "definition": "to study something in order to understand it",
                        "wordRootDefinitionID": 4771024,
                        "partOfSpeech": "verb",
                        "audioURL": "https://cdna.englishcentral.com/words/a/analyze_3502_30494.mp3"
                    },
                    "dialogTitle": "Lava Descent "
                }]
            }, {
                "word": {
                    "jsonType": "word",
                    "wordHeadID": 110,
                    "wordRootID": 8894,
                    "orthography": "AREA",
                    "wordRootOrthography": "AREA",
                    "pronunciation": "EH R IY AH",
                    "definition": "the size of a surface",
                    "wordRootDefinitionID": 2628484,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/a/area_4923_7551.mp3"
                },
                "distractors": [{
                    "jsonType": "word",
                    "wordHeadID": 578,
                    "wordRootID": 409370,
                    "orthography": "KNIFE",
                    "wordRootOrthography": "KNIFE",
                    "pronunciation": "N AY F",
                    "definition": "a sharp piece of metal with a handle",
                    "wordRootDefinitionID": 4752327,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/k/knife_62880_11803.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 31143,
                    "wordRootID": 121816,
                    "orthography": "ON THE WAY",
                    "wordRootOrthography": "ON THE WAY",
                    "pronunciation": "AO N SIL DH AH SIL W EY",
                    "definition": "on the route of a journey",
                    "wordRootDefinitionID": 4768597,
                    "partOfSpeech": "idiom",
                    "audioURL": "https://cdna.englishcentral.com/words/o/on_the_way_132207_27255.mp3"
                }, {
                    "jsonType": "word",
                    "wordHeadID": 33589,
                    "wordRootID": 426770,
                    "orthography": "USER EXPERIENCE",
                    "wordRootOrthography": "USER EXPERIENCE",
                    "pronunciation": "Y UW Z ER SIL IH K S P IH R IY EH N S",
                    "definition": "a person's opinion after using a product",
                    "wordRootDefinitionID": 4766360,
                    "partOfSpeech": "noun",
                    "audioURL": "https://cdna.englishcentral.com/words/u/user_experience_200352_32707.mp3"
                }],
                "examples": [{
                    "dialogLineID": 140544,
                    "dialogID": 17314,
                    "sequence": 23,
                    "transcript": "Okay, now what is the area of Germany?",
                    "videoURL": "https://cdna.englishcentral.com/dialogs/17314/linecliplarge_17314_140544_78401_20120522041943.mp4",
                    "thumbnailURL": "https://cdna.englishcentral.com/dialogs/17314/linethumb_17314_140544_78401_20120522041943.jpg",
                    "cueStart": 78401,
                    "cueEnd": 83680,
                    "slowSpeakStart": 117752,
                    "slowSpeakEnd": 125745,
                    "pointsMax": 33,
                    "word": {
                        "jsonType": "word",
                        "wordInstanceID": 356667,
                        "wordHeadID": 110,
                        "wordRootID": 8894,
                        "orthography": "AREA",
                        "wordRootOrthography": "AREA",
                        "pronunciation": "EH R IY AH",
                        "definition": "the size of a surface",
                        "wordRootDefinitionID": 2628484,
                        "partOfSpeech": "noun",
                        "audioURL": "https://cdna.englishcentral.com/words/a/area_4923_7551.mp3"
                    },
                    "dialogTitle": "What's the Population?"
                }]
            }]
        };

        let subject = new Subject();

        setTimeout(() => subject.next(response), 2000);

        return subject;



       /* let options = courseId ? {
            complete: true,
            activityID: activityId,
            courseID: courseId
        } : {
            complete: true,
            activityID: activityId
        };

        return this.connection
            .service("bridge")
            .setPath("/content/vocabularyQuiz")
            .get(this.getQuizOptions(options, additionalOptions));*/
    }

    getByWordHeadIds(wordHeadIds: number[],
                     additionalOptions: Object = {}): Observable<any> {
        let options = {
            complete: true,
            wordHeadIDs: wordHeadIds.join(",")
        };

        return this.connection
            .service("bridge")
            .setPath("/content/vocabularyQuiz")
            .get(this.getQuizOptions(options, additionalOptions));
    }
}
