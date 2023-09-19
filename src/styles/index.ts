import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionContainer: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    // alignItems: 'flex-start',
    // flex: 0.85,
  },
  week: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  day: {
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 10,
    fontSize: 20,
    lineHeight: 16 * 1.5,
  },
  line: {
    height: 1,
    marginVertical: 30,
  },
  liftSubContainer: {
    //
  },
  lift: {
    textTransform: 'uppercase',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  rx: {
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  notesContainer: {
    //
  },
  sessionNotesContainer: {
    paddingBottom: 10,
  },
  liftContainer: {
    //
  },
  subNotesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bullet: {
    fontWeight: '600',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    width: 10,
    textAlign: 'center',
  },
  note: {
    fontWeight: '600',
    textAlign: 'left',
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    marginLeft: -6,
  },
  rxContainer: {
    paddingBottom: 10,
  },
  panelContainer: {
    flex: 1,
  },
  panelTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  panelOption: {
    fontSize: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '100%',
    paddingLeft: 16,
  },
  panelHeaderContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingTop: 0,
  },
  panelRowsContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingRight: 40,
    paddingVertical: 10,
    width: '100%',
  },
  panelRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default styles;
